
// Hairstyle data - ဆံပင်ပုံစံ ၆၃ မျိုး
const hairstyles = [
    // Fade Hairstyles (7)
    {
        id: 1,
        name: "Low Fade",
        category: "fade",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/low-fade-1.jpg", "images/low-fade-2.jpg", "images/low-fade-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၁ လက်မမှ ၃ လက်မအထိ",
        serviceTime: "မိနစ် ၂၀",
        userRatings: []
    },
    {
        id: 2,
        name: "Mid Fade",
        category: "fade",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/mid-fade-1.jpg", "images/mid-fade-2.jpg", "images/mid-fade-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၁ လက်မမှ ၄ လက်မအထိ",
        serviceTime: "မိနစ် 25",
        userRatings: []
    },
    {
        id: 3,
        name: "High Fade",
        category: "fade",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/high-fade-3.jpg", "images/high-fade-2.jpg", "images/high-fade-1.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၀.၅ လက်မမှ ၃ လက်မအထိ",
        serviceTime: "မိနစ် ၃၀",
        userRatings: []
    },
    {
        id: 4,
        name: "Skin Fade",
        category: "fade",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/skin-fade-1.jpg", "images/skin-fade-2.jpg", "images/skin-fade-3.jpg"],
        faceType: "စတုရန်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၀ လက်မမှ ၃ လက်မအထိ",
        serviceTime: "မိနစ် 25",
        userRatings: []
    },
    {
        id: 5,
        name: "Drop Fade",
        category: "fade",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/drop-fade-1.jpg", "images/drop-fade-2.jpg", "images/drop-fade-3.jpg"],
        faceType: "ဝိုင်းဝိုင်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၀.၅ လက်မမှ ၄ လက်မအထိ",
        serviceTime: "မိနစ် 25",
        userRatings: []
    },
{
        id: 6,
        name: "Curly Fade",
        category: "fade",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/curly-fade-1.jpg", "images/curly-fade-2.jpg", "images/curly-fade-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၃ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၂၅",
        userRatings: []
    },
    
    {
        id: 7,
        name: "Taper Fade",
        category: "fade",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/taper-fade-1.jpg", "images/taper-fade-2.jpg", "images/taper-fade-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၂ လက်မမှ ၄ လက်မအထိ",
        serviceTime: "မိနစ် ၃၅",
        userRatings: []
    },

    // Buzz Cut Styles (6)
    {
        id: 8,
        name: "Induction Cut",
        category: "buzz",
        price: "၂၀၀၀ ကျပ်",
        images: ["images/induction-cut-1.jpg", "images/induction-cut-2.jpg", "images/induction-cut-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၀.၁ လက်မမှ ၀.၅ လက်မအထိ",
        serviceTime: "မိနစ် ၁၅",
        userRatings: []
    },
    {
        id: 9,
        name: "Buzz Cut",
        category: "buzz",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/buzz-cut-1.jpg", "images/buzz-cut-2.jpg", "images/buzz-cut-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၀.၂ လက်မမှ ၀.၈ လက်မအထိ",
        serviceTime: "မိနစ် ၁၈",
        userRatings: []
    },
    {
        id: 10,
        name: "Butch Cut",
        category: "buzz",
        price: "၂၀၀၀ ကျပ်",
        images: ["images/butch-cut-1.jpg", "images/butch-cut-2.jpg", "images/butch-cut-3.jpg"],
        faceType: "စတုရန်းပုံ၊ ဝိုင်းဝိုင်းပုံ",
        hairLength: "၀.၅ လက်မမှ ၁ လက်မအထိ",
        serviceTime: "မိနစ် ၂၀",
        userRatings: []
    },
    {
        id: 11,
        name: "Crew Cut",
        category: "buzz",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/crew-cut-1.jpg", "images/crew-cut-2.jpg", "images/crew-cut-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၀.၅ လက်မမှ ၂ လက်မအထိ",
        serviceTime: "မိနစ် ၂၅",
        userRatings: []
    },
    {
        id: 12,
        name: "Ivy League Cut",
        category: "buzz",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/ivy-league-1.jpg", "images/ivy-league-2.jpg", "images/ivy-league-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၁ လက်မမှ ၃ လက်မအထိ",
        serviceTime: "မိနစ် ၃၀",
        userRatings: []
    },
    {
        id: 13,
        name: "Fade Buzz Cut",
        category: "buzz",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/fade-buzz-1.jpg", "images/fade-buzz-2.jpg", "images/fade-buzz-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၀.၅ လက်မမှ ၂ လက်မအထိ",
        serviceTime: "မိနစ် ၃၅",
        userRatings: []
    },

    // Undercut Styles (5)
    {
        id: 14,
        name: "Classic Undercut",
        category: "undercut",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/classic-undercut-1.jpg", "images/classic-undercut-2.jpg", "images/classic-undercut-3.jpg","images/slick-back-undercut-4.jpg"],
        faceType: "စတုရန်းပုံ၊ ဝိုင်းဝိုင်းပုံ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၄၀",
        userRatings: []
    },
    {
        id: 15,
        name: "Disconnected Undercut",
        category: "undercut",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/disconnected-undercut-1.jpg", "images/disconnected-undercut-2.jpg", "images/disconnected-undercut-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၅၀",
        userRatings: []
    },
    {
        id: 16,
        name: "Textured Undercut",
        category: "undercut",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/textured-undercut-1.jpg", "images/textured-undercut-2.jpg", "images/textured-undercut-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၄၅",
        userRatings: []
    },
    {
        id: 17,
        name: "Slick Back Undercut",
        category: "undercut",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/slick-back-undercut-1.jpg", "images/slick-back-undercut-2.jpg", "images/slick-back-undercut-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၇ လက်မအထိ",
        serviceTime: "မိနစ် ၅၀",
        userRatings: []
    },
    {
        id: 18,
        name: "Side Part Undercut",
        category: "undercut",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/side-part-undercut-1.jpg", "images/side-part-undercut-2.jpg", "images/side-part-undercut-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၃၀",
        userRatings: []
    },

    // Pompadour Styles (5)
    {
        id: 19,
        name: "Classic Pompadour",
        category: "pompadour",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/classic-pompadour-1.jpg", "images/classic-pompadour-2.jpg", "images/classic-pompadour-3.jpg"],
        faceType: "ဘဲဥပုံ၊ ရှည်လျားသောပုံ",
        hairLength: "၄ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၄၅",
        userRatings: []
    },
    {
        id: 20,
        name: "Modern Pompadour",
        category: "pompadour",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/modern-pompadour-1.jpg", "images/modern-pompadour-2.jpg", "images/modern-pompadour-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၅၀",
        userRatings: []
    },
    {
        id: 21,
        name: "Fade Pompadour",
        category: "pompadour",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/fade-pompadour-1.jpg", "images/fade-pompadour-2.jpg", "images/fade-pompadour-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၄ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၅၅",
        userRatings: []
    },
    {
        id: 22,
        name: "Textured Pompadour",
        category: "pompadour",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/textured-pompadour-1.jpg", "images/textured-pompadour-2.jpg", "images/textured-pompadour-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၅၀",
        userRatings: []
    },
    {
        id: 23,
        name: "Short Pompadour",
        category: "pompadour",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/short-pompadour-1.jpg", "images/short-pompadour-2.jpg", "images/short-pompadour-3.jpg"],
        faceType: "ဝိုင်းဝိုင်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၄၀",
        userRatings: []
    },

    // Quiff Styles (5)
    {
        id: 24,
        name: "Classic Quiff",
        category: "quiff",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/classic-quiff-1.jpg", "images/classic-quiff-2.jpg", "images/classic-quiff-3.jpg"],
        faceType: "ဘဲဥပုံ၊ နှလုံးပုံ",
        hairLength: "၄ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၄၅",
        userRatings: []
    },
    {
        id: 25,
        name: "Modern Quiff",
        category: "quiff",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/modern-quiff-1.jpg", "images/modern-quiff-2.jpg", "images/modern-quiff-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၅၀",
        userRatings: []
    },
    {
        id: 26,
        name: "Fade Quiff",
        category: "quiff",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/fade-quiff-1.jpg", "images/fade-quiff-2.jpg", "images/fade-quiff-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၄ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၅၅",
        userRatings: []
    },
    {
        id: 27,
        name: "Short Quiff",
        category: "quiff",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/short-quiff-1.jpg", "images/short-quiff-2.jpg", "images/short-quiff-3.jpg"],
        faceType: "ဝိုင်းဝိုင်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၄၀",
        userRatings: []
    },
    {
        id: 28,
        name: "Side Quiff",
        category: "quiff",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/side-quiff-1.jpg", "images/side-quiff-2.jpg", "images/side-quiff-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၄၅",
        userRatings: []
    },

    // Side Part Styles (5)
    {
        id: 29,
        name: "Classic Side Part",
        category: "side-part",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/classic-side-part-1.jpg", "images/classic-side-part-2.jpg", "images/classic-side-part-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၃၀",
        userRatings: []
    },
    {
        id: 30,
        name: "Hard Part",
        category: "side-part",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/hard-part-1.jpg", "images/hard-part-2.jpg", "images/hard-part-3.jpg"],
        faceType: "စတုရန်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၃၅",
        userRatings: []
    },
    {
        id: 31,
        name: "Textured Side Part",
        category: "side-part",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/textured-side-part-1.jpg", "images/textured-side-part-2.jpg", "images/textured-side-part-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၃၅",
        userRatings: []
    },
    {
        id: 32,
        name: "Fade Side Part",
        category: "side-part",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/fade-side-part-1.jpg", "images/fade-side-part-2.jpg", "images/fade-side-part-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၄၀",
        userRatings: []
    },
    {
        id: 33,
        name: "Curtain Part",
        category: "side-part",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/curtain-part-1.jpg", "images/curtain-part-2.jpg", "images/curtain-part-3.jpg"],
        faceType: "ဘဲဥပုံ၊ နှလုံးပုံ",
        hairLength: "၄ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၄၅",
        userRatings: []
    },

    // Slick Back Styles (5)
    {
        id: 34,
        name: "Classic Slick Back",
        category: "slick-back",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/classic-slick-back-1.jpg", "images/classic-slick-back-2.jpg", "images/classic-slick-back-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၇ လက်မအထိ",
        serviceTime: "မိနစ် ၅၀",
        userRatings: []
    },
    {
        id: 35,
        name: "Textured Slick Back",
        category: "slick-back",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/textured-slick-back-1.jpg", "images/textured-slick-back-2.jpg", "images/textured-slick-back-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၇ လက်မအထိ",
        serviceTime: "မိနစ် ၅၅",
        userRatings: []
    },
    {
        id: 36,
        name: "Wet Look Slick Back",
        category: "slick-back",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/wet-slick-back-1.jpg", "images/wet-slick-back-2.jpg", "images/wet-slick-back-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၇ လက်မအထိ",
        serviceTime: "မိနစ် ၆၀",
        userRatings: []
    },
    {
        id: 37,
        name: "Dry Slick Back",
        category: "slick-back",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/dry-slick-back-1.jpg", "images/dry-slick-back-2.jpg", "images/dry-slick-back-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၇ လက်မအထိ",
        serviceTime: "မိနစ် ၄၅",
        userRatings: []
    },
    {
        id: 38,
        name: "Slick Back Undercut",
        category: "slick-back",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/slick-back-undercut-1.jpg", "images/slick-back-undercut-2.jpg", "images/slick-back-undercut-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၇ လက်မအထိ",
        serviceTime: "မိနစ် ၆၀",
        userRatings: []
    },

    // Curly Hair Styles (5)
    {
        id: 39,
        name: "Curly Fade",
        category: "curly",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/curly-fade-1.jpg", "images/curly-fade-2.jpg", "images/curly-fade-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၀.၅ လက်မမှ ၃ လက်မအထိ",
        serviceTime: "မိနစ် ၄၀",
        userRatings: []
    },
    {
        id: 40,
        name: "Curly Top",
        category: "curly",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/curly-top-1.jpg", "images/curly-top-2.jpg", "images/curly-top-3.jpg"],
        faceType: "ဝိုင်းဝိုင်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၄ လက်မမှ ၇ လက်မအထိ",
        serviceTime: "မိနစ် ၄၅",
        userRatings: []
    },
    {
        id: 41,
        name: "Textured Curls",
        category: "curly",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/textured-curls-1.jpg", "images/textured-curls-2.jpg", "images/textured-curls-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၅၅",
        userRatings: []
    },
    {
        id: 42,
        name: "Short Curls",
        category: "curly",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/short-curls-1.jpg", "images/short-curls-2.jpg", "images/short-curls-3.jpg"],
        faceType: "ဝိုင်းဝိုင်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၂ လက်မမှ ၄ လက်မအထိ",
        serviceTime: "မိနစ် ၄၀",
        userRatings: []
    },
    {
        id: 43,
        name: "Afro Style",
        category: "curly",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/afro-style-1.jpg", "images/afro-style-2.jpg", "images/afro-style-3.jpg"],
        faceType: "ဝိုင်းဝိုင်းပုံ၊ စတုရန်းပုံ",
        hairLength: "၆ လက်မအထက်",
        serviceTime: "မိနစ် ၆၀",
        userRatings: []
    },

    // Long Hair Styles (5)
    {
        id: 44,
        name: "Man Bun",
        category: "long",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/man-bun-1.jpg", "images/man-bun-2.jpg", "images/man-bun-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၆ လက်မအထက်",
        serviceTime: "မိနစ် ၂၅",
        userRatings: []
    },
    {
        id: 45,
        name: "Long Layers",
        category: "long",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/long-layers-1.jpg", "images/long-layers-2.jpg", "images/long-layers-3.jpg"],
        faceType: "ဘဲဥပုံ၊ ရှည်လျားသောပုံ",
        hairLength: "၆ လက်မအထက်",
        serviceTime: "မိနစ် ၆၀",
        userRatings: []
    },
    {
        id: 46,
        name: "Half Bun",
        category: "long",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/half-bun-1.jpg", "images/half-bun-2.jpg", "images/half-bun-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၆ လက်မအထက်",
        serviceTime: "မိနစ် ၄၀",
        userRatings: []
    },
    {
        id: 47,
        name: "Pony Tail",
        category: "long",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/pony-tail-1.jpg", "images/pony-tail-2.jpg", "images/pony-tail-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၆ လက်မအထက်",
        serviceTime: "မိနစ် ၂၀",
        userRatings: []
    },
    {
        id: 48,
        name: "Natural Long",
        category: "long",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/natural-long-1.jpg", "images/natural-long-2.jpg", "images/natural-long-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၆ လက်မအထက်",
        serviceTime: "မိနစ် ၇၀",
        userRatings: []
    },

    // French Crop Styles (5)
    {
        id: 49,
        name: "Classic French Crop",
        category: "french-crop",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/classic-french-crop-1.jpg", "images/classic-french-crop-2.jpg", "images/classic-french-crop-3.jpg"],
        faceType: "ဝိုင်းဝိုင်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၂ လက်မမှ ၄ လက်မအထိ",
        serviceTime: "မိနစ် ၃၅",
        userRatings: []
    },
    {
        id: 50,
        name: "Textured Crop",
        category: "french-crop",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/textured-crop-1.jpg", "images/textured-crop-2.jpg", "images/textured-crop-3.jpg"],
        faceType: "ဝိုင်းဝိုင်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၂ လက်မမှ ၄ လက်မအထိ",
        serviceTime: "မိနစ် ၄၀",
        userRatings: []
    },
    {
        id: 51,
        name: "Fade French Crop",
        category: "french-crop",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/fade-french-crop-1.jpg", "images/fade-french-crop-2.jpg", "images/fade-french-crop-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၂ လက်မမှ ၄ လက်မအထိ",
        serviceTime: "မိနစ် ၄၅",
        userRatings: []
    },
    {
        id: 52,
        name: "Long French Crop",
        category: "french-crop",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/long-french-crop-1.jpg", "images/long-french-crop-2.jpg", "images/long-french-crop-3.jpg"],
        faceType: "ဝိုင်းဝိုင်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၄၀",
        userRatings: []
    },
    {
        id: 53,
        name: "Short French Crop",
        category: "french-crop",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/short-french-crop-1.jpg", "images/short-french-crop-2.jpg", "images/short-french-crop-3.jpg"],
        faceType: "ဝိုင်းဝိုင်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၁ လက်မမှ ၃ လက်မအထိ",
        serviceTime: "မိနစ် ၃၀",
        userRatings: []
    },

    // Comb Over Styles (5)
    {
        id: 54,
        name: "Classic Comb Over",
        category: "comb-over",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/classic-comb-over-1.jpg", "images/classic-comb-over-2.jpg", "images/classic-comb-over-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၃၅",
        userRatings: []
    },
    {
        id: 55,
        name: "Modern Comb Over",
        category: "comb-over",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/modern-comb-over-1.jpg", "images/modern-comb-over-2.jpg", "images/modern-comb-over-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၄၀",
        userRatings: []
    },
    {
        id: 56,
        name: "Volume Comb Over",
        category: "comb-over",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/volume-comb-over-1.jpg", "images/volume-comb-over-2.jpg", "images/volume-comb-over-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၄၅",
        userRatings: []
    },
    {
        id: 57,
        name: "Fade Comb Over",
        category: "comb-over",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/fade-comb-over-1.jpg", "images/fade-comb-over-2.jpg", "images/fade-comb-over-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၅၀",
        userRatings: []
    },
    {
        id: 58,
        name: "Short Comb Over",
        category: "comb-over",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/short-comb-over-1.jpg", "images/short-comb-over-2.jpg", "images/short-comb-over-3.jpg"],
        faceType: "ဝိုင်းဝိုင်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၂ လက်မမှ ၄ လက်မအထိ",
        serviceTime: "မိနစ် ၃၀",
        userRatings: []
    },

    // Spiky Styles (5)
    {
        id: 59,
        name: "Textured Spikes",
        category: "spiky",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/textured-spikes-1.jpg", "images/textured-spikes-2.jpg", "images/textured-spikes-3.jpg"],
        faceType: "ဝိုင်းဝိုင်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၄၀",
        userRatings: []
    },
    {
        id: 60,
        name: "Sharp Spikes",
        category: "spiky",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/sharp-spikes-1.jpg", "images/sharp-spikes-2.jpg", "images/sharp-spikes-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၄ လက်မမှ ၆ လက်မအထိ",
        serviceTime: "မိနစ် ၄၅",
        userRatings: []
    },
    {
        id: 61,
        name: "Fade Spikes",
        category: "spiky",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/fade-spikes-1.jpg", "images/fade-spikes-2.jpg", "images/fade-spikes-3.jpg"],
        faceType: "အားလုံးသော မျက်နှာအမျိုးအစားများ",
        hairLength: "၃ လက်မမှ ၅ လက်မအထိ",
        serviceTime: "မိနစ် ၅၀",
        userRatings: []
    },
    {
        id: 62,
        name: "Short Spikes",
        category: "spiky",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/short-spikes-1.jpg", "images/short-spikes-2.jpg", "images/short-spikes-3.jpg"],
        faceType: "ဝိုင်းဝိုင်းပုံ၊ ဘဲဥပုံ",
        hairLength: "၂ လက်မမှ ၄ လက်မအထိ",
        serviceTime: "မိနစ် ၃၅",
        userRatings: []
    },
    {
        id: 63,
        name: "Long Spikes",
        category: "spiky",
        price: "၄၀၀၀ ကျပ်",
        images: ["images/long-spikes-1.jpg", "images/long-spikes-2.jpg", "images/long-spikes-3.jpg"],
        faceType: "ဘဲဥပုံ၊ စတုရန်းပုံ",
        hairLength: "၅ လက်မမှ ၇ လက်မအထိ",
        serviceTime: "မိနစ် ၅၅",
        userRatings: []
    }
];
