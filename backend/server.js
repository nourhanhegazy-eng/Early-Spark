const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { OpenAI } = require('openai'); // مكتبة OpenAI الرسمية
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// إعداد مجلد الرفع
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'uploads/') },
    filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname) }
});
const upload = multer({ storage: storage });

// إعداد العميل (Client) ليدعم Azure أو OpenAI العادي
let openai;
try {
    // لو عندك مفاتيح Azure في الـ .env
    if (process.env.AZURE_OPENAI_KEY && process.env.AZURE_OPENAI_ENDPOINT) {
        console.log("🔹 تم اكتشاف إعدادات Azure OpenAI.");
        openai = new OpenAI({
            apiKey: process.env.AZURE_OPENAI_KEY,
            baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/gpt-35-turbo`, // تأكدي من اسم الـ Deployment
            defaultQuery: { 'api-version': '2023-05-15' },
            defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_KEY }
        });
    } else if (process.env.OPENAI_API_KEY) {
        // لو مفتاح OpenAI عادي
        console.log("🔹 تم اكتشاف مفتاح OpenAI Standard.");
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    } else {
        console.warn("⚠️ تحذير: لم يتم العثور على مفاتيح API في ملف .env!");
    }
} catch (err) {
    console.error("خطأ في إعداد OpenAI:", err.message);
}

// دالة التحليل الذكي
async function generateAIReport(childName, age) {
    if (!openai) throw new Error("مفاتيح الذكاء الاصطناعي (API Keys) مفقودة من السيرفر.");

    const prompt = `
    You are an expert child psychologist. Analyze a child named "${childName}", age "${age}".
    Output ONLY valid JSON format:
    {
        "overall": 85,
        "stats": { "found": 3, "conf": 90 },
        "scores": { "bodily": 80, "spatial": 70, "logical": 60 },
        "content": {
            "ar": {
                "desc_bodily": "وصف لقدرات الطفل الحركية",
                "desc_spatial": "وصف لقدرات الطفل المكانية",
                "desc_logical": "وصف لقدرات الطفل المنطقية",
                "recs": ["نشاط 1", "نشاط 2", "نشاط 3"],
                "games": ["لعبة 1", "لعبة 2", "لعبة 3"],
                "tips": ["نصيحة 1", "نصيحة 2", "نصيحة 3"]
            },
            "en": {
                "desc_bodily": "Description of bodily skills",
                "desc_spatial": "Description of spatial skills",
                "desc_logical": "Description of logical skills",
                "recs": ["Activity 1", "Activity 2", "Activity 3"],
                "games": ["Game 1", "Game 2", "Game 3"],
                "tips": ["Tip 1", "Tip 2", "Tip 3"]
            }
        }
    }
    Make the scores and recommendations DYNAMIC and random but realistic based on a creative child profile.
    `;

    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a JSON generator. Always respond with pure JSON." },
            { role: "user", content: prompt }
        ],
        model: "gpt-3.5-turbo", // أو اسم موديل Azure الخاص بك
        temperature: 0.8, // زيادة العشوائية عشان النتائج تتغير
    });

    let content = completion.choices[0].message.content;
    // تنظيف الكود من أي علامات Markdown
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(content);
}

app.post('/api/analyze', upload.single('video'), async (req, res) => {
    try {
        const childName = req.body.childName || "Child";
        const childAge = req.body.childAge || "5";
        
        console.log(`📥 طلب تحليل جديد لـ: ${childName}`);

        // محاولة الاتصال الحقيقي
        const report = await generateAIReport(childName, childAge);
        
        console.log("✅ تم التحليل بنجاح!");
        res.json({ success: true, data: report });

    } catch (error) {
        console.error("❌ فشل التحليل:", error.message);
        
        // إرسال رسالة الخطأ للفرونت إند بدلاً من التقرير الوهمي
        res.status(500).json({ 
            success: false, 
            error: "فشل الاتصال بـ AI. تأكد من المفاتيح (API Key) في ملف .env",
            details: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});