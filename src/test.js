const data = [
    {"장소": "천호누룽지통닭구이",
    "총액": 32000,
    "참가자": ["태양", "기석", "성현", "재환"]},
    {"장소": "소문난쭈꾸미",
    "총액": 68000,
    "참가자": ["태양", "기석", "성현", "재환", "석우"]},
    {"장소": "생활맥주",
    "총액": 47000,
    "참가자": ["태양", "기석", "성현", "재환", "석우"]}
];

const arr = [];
data.map((d) => {
    let cost = d.총액 / d.참가자.length;
    let location = d.장소;

    d.참가자.map(name=> {
        if(arr.find(e => e.참가자 === name)) {
            let i = arr.findIndex(e => e.참가자 === name);
            arr[i].총액 += cost;
            arr[i][location] = cost;
        } else {
            let a = {"참가자": name,
            "총액": +cost,
            [location]: cost};
            arr.push(a);
        }
    })
});

console.log(arr);