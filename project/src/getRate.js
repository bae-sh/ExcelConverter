import axios from "axios";

const getRate = async (hscode, setRate) => {
    try {
        let url =
            "https://ggjlflldt2.execute-api.ap-northeast-2.amazonaws.com/default/getRate";
        let response = await axios.post(
            url,
            JSON.stringify({ hscode: hscode })
        );
        let arr = response.data.elements[0].elements;
        let obj = { hscode: hscode, A: "X", C: "X", FCN1: "X" };
        for (const e of arr) {
            if (e.name === "trrtQryRsltVo") {
                if (e.elements[3].elements[0].text === "A") {
                    obj["A"] = e.elements[7].elements[0].text;
                } else if (e.elements[3].elements[0].text === "C") {
                    obj["C"] = e.elements[7].elements[0].text;
                } else if (e.elements[3].elements[0].text === "FCN1") {
                    obj["FCN1"] = e.elements[7].elements[0].text;
                }
            }
        }
        setRate((prev) => [...prev, obj]);
    } catch (err) {}
};

export { getRate };
