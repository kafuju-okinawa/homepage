// 翻訳データ (変更なし)
const menuTranslations = {
    // ... (省略、元の翻訳データのままです) ...
    "jp": {
        // ...
        "tab-food": "お料理 (Food)",
        "tab-drink": "お飲み物 (Drink)",
        // ...
    },
    // ...
};

const allergenTranslations = {
    "jp": { "乳": "乳", "卵": "卵", "小麦": "小麦", "大豆": "大豆", "牛肉": "牛肉", "豚肉": "豚肉", "魚介": "魚介" },
    "en": { "乳": "Dairy", "卵": "Egg", "小麦": "Wheat", "大豆": "Soy", "牛肉": "Beef", "豚肉": "Pork", "魚介": "Seafood" },
    "cn": { "乳": "乳制品", "卵": "蛋", "小麦": "小麦", "大豆": "大豆", "牛肉": "牛肉", "豚肉": "猪肉", "魚介": "海鲜" }
};

// メニューデータ (画像パスを修正)
const foodMenuData = [
    { category: "cat-otsumami", items: [
        { key: "iburigakko", price: "480円", allergens: ["乳"], img: "images/menu/iburigakko.jpg" },
        { key: "shutou-cheese", price: "480円", allergens: ["乳", "魚介"], img: "images/menu/shutou_cheese.jpg" },
        { key: "yamaimo-zakuzaku", price: "480円", allergens: [], img: "images/menu/yamaimo.jpg" },
        { key: "mozukusu", price: "480円", allergens: [], img: "images/menu/mozuku.jpg" },
        { key: "umibudou", price: "480円", allergens: [], img: "images/menu/umibudou.jpg" },
        { key: "kyuri-ippon", price: "480円", allergens: [], img: "images/menu/cucumber.jpg" },
        { key: "hiyayakko", price: "480円", allergens: ["大豆"], img: "images/menu/tofu.jpg" },
        { key: "caesar-salad", price: "540円", allergens: ["乳", "卵", "小麦"], img: "images/menu/salad.jpg" },
        { key: "pirikara-tamago", price: "480円", allergens: ["卵", "小麦", "大豆"], img: "images/menu/egg.jpg" },
        { key: "pirikara-menma", price: "480円", allergens: ["小麦", "大豆"], img: "images/menu/menma.jpg" },
        { key: "aburi-charshu", price: "620円", allergens: ["小麦", "大豆"], img: "images/menu/charshu.jpg" }
    ]},
    { category: "cat-agemono", items: [
        { key: "wakadori-karaage", price: "720円", allergens: ["小麦", "卵", "大豆"], img: "images/menu/karaage.jpg" },
        { key: "potato-fry", price: "640円", allergens: [], img: "images/menu/fries.jpg" },
        { key: "atsuage-yakumi", price: "620円", allergens: ["大豆"], img: "images/menu/atsuage.jpg" },
        { key: "youngcorn-tenpura", price: "640円", allergens: ["小麦", "卵"], img: "images/menu/corn.jpg" }
    ]},
    { category: "cat-ippinmono", items: [
        { key: "tacos-meatpie", price: "820円", allergens: ["小麦", "乳", "牛肉"], img: "images/menu/meatpie.jpg" },
        { key: "taimo-cheese", price: "580円", allergens: ["乳"], img: "images/menu/taimo.jpg" },
        { key: "mabo-dofu", price: "820円", allergens: ["大豆", "小麦", "豚肉"], img: "images/menu/mabo.jpg" },
        { key: "anchovy-cabbage", price: "640円", allergens: ["魚介"], img: "images/menu/cabbage.jpg" },
        { key: "gyoza", price: "640円", allergens: ["小麦", "大豆", "豚肉"], img: "images/menu/gyoza.jpg" },
        { key: "tofu-garlic", price: "640円", allergens: ["大豆"], img: "images/menu/tofu_garlic.jpg" },
        { key: "goya-chanpuru", price: "640円", allergens: ["卵", "大豆", "豚肉"], img: "images/menu/goya.jpg" },
        { key: "dashimaki", price: "560円", allergens: ["卵"], img: "images/menu/tamago.jpg" },
        { key: "niku-yakimochi", price: "560円", allergens: ["小麦", "大豆", "豚肉"], img: "images/menu/mochi.jpg" }
    ]},
    { category: "cat-niku", items: [
         { key: "gyu-rare-katsu", price: "1200円", allergens: ["小麦", "卵", "牛肉"], img: "images/menu/beef_katsu.jpg" },
         { key: "rib-steak", price: "1480円", allergens: ["牛肉"], img: "images/menu/steak.jpg" },
         { key: "wagyu-rib-steak", price: "2480円", allergens: ["牛肉"], img: "images/menu/wagyu.jpg" },
         { key: "hamburger", price: "980円", allergens: ["卵", "小麦", "乳", "牛肉", "豚肉"], img: "images/menu/burger.jpg" },
         { key: "chicken-tatsuta", price: "740円", allergens: ["小麦", "卵", "大豆"], img: "images/menu/chicken.jpg" },
         { key: "chicken-steak", price: "780円", allergens: ["小麦", "大豆"], img: "images/menu/chicken_steak.jpg" }
    ]},
    { category: "cat-main", items: [
        { key: "reimen", price: "820円", allergens: ["小麦", "卵"], img: "images/menu/noodles.jpg" },
        { key: "garlic-pizza", price: "720円", allergens: ["小麦", "乳", "豚肉"], img: "images/menu/pizza.jpg" },
        { key: "margherita", price: "720円", allergens: ["小麦", "乳"], img: "images/menu/margherita.jpg" },
        { key: "koumi-chahan", price: "780円", allergens: ["卵", "小麦", "大豆"], img: "images/menu/fried_rice.jpg" },
        { key: "mayu-chahan", price: "780円", allergens: ["卵", "小麦", "大豆"], img: "images/menu/mayu_rice.jpg" },
        { key: "taco-rice", price: "480円", allergens: ["乳", "牛肉"], img: "images/menu/taco_rice.jpg" }
    ]},
     { category: "cat-dessert", items: [
        { key: "vanilla-ice", price: "200円", allergens: ["乳", "卵"], img: "images/menu/ice_cream.jpg" },
        { key: "age-mochi", price: "300円", allergens: [], img: "images/menu/age_mochi.jpg" }
    ]}
];

const drinkMenuData = [
    { category: "cat-alcohol", items: [
        { key: "beer", price: "550円", allergens: ["小麦"], img: "images/menu/beer.jpg" },
        { key: "awamori", price: "500円", allergens: [], img: "images/menu/awamori.jpg" }
    ]},
     { category: "cat-nonalcohol", items: [
        { key: "sanpincha", price: "300円", allergens: [], img: "images/menu/tea.jpg" }
    ]}
];


