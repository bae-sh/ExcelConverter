import { obj } from "./routes/DataList";
import html2canvas from "html2canvas";
const exceljs = async () => {
    const ExcelJS = require("exceljs");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");

    worksheet.columns = [
        { header: "특이사항/特别事项", key: "exception", width: 30 },
        { header: "사진/照片", key: "png", width: 20 },
        { header: "제품이름/产品名", key: "ko", width: 22 },
        { header: "중국어이름/中文名", key: "en", width: 22 },
        { header: "재질/材质", key: "texture", width: 20 },
        { header: "수량/数量", key: "mount", width: 20 },
        { header: "국내운송장번호/国内快递单号", key: "number", width: 40 },
        { header: "신고단가（$）/申报价格（美金）", key: "price", width: 40 },
        { header: "HS CODE/海关编码", key: "hscode", width: 30 },
        { header: "박스번호라벨/发货编号", key: "boxnumber", width: 30 },
    ];

    obj.forEach((myobj, idx) => {
        worksheet.addRow(myobj);
        worksheet.getRow(idx + 2).height = 100;
    });

    let promise = [];
    let li = document.querySelector("#img0");
    promise.push(
        html2canvas(document.body).then((canvas) => {
            console.log(li);
            console.log(canvas);
            console.log(canvas.toDataURL("image/png"));
            document.body.appendChild(canvas);
            let imageURL = canvas.toDataURL();
            const imageId2 = workbook.addImage({
                base64: imageURL,
                extension: "png",
            });
            console.log(imageId2);
            worksheet.addImage(imageId2, "B2:B2");
        })
    );

    const row = worksheet.getRow(1);

    row.height = 40;
    row.eachCell((cell, rowNumber) => {
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "A6A6A6" },
        };
        cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
        };

        worksheet.getColumn(rowNumber).alignment = {
            vertical: "middle",
            horizontal: "center",
        };
        worksheet.getColumn(rowNumber).font = { size: 15 };
    });
    row.font = {
        bold: true,
        size: 15,
    };

    Promise.all(promise).then(() => {
        workbook.xlsx.writeBuffer().then((b) => {
            let a = new Blob([b]);
            let url = window.URL.createObjectURL(a);

            let elem = document.createElement("a");
            elem.href = url;
            elem.download = `test.xlsx`;
            document.body.appendChild(elem);
            elem.style = "display: none";
            elem.click();
            elem.remove();
        });
    });
};
export default exceljs;
