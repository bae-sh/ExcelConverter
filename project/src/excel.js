import html2canvas from "html2canvas";

const exceljs = async (productList) => {
    const fileName = prompt("파일이름을 작성하세요");
    const ExcelJS = require("exceljs");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");
    let promise = [];

    if (fileName) {
        worksheet.columns = [
            { header: "특이사항/特别事项", key: "exception", width: 30 },
            { header: "사진/照片", key: "png", width: 20 },
            { header: "제품이름/产品名", key: "ko", width: 22 },
            { header: "영어이름/英文名", key: "en", width: 22 },
            { header: "중국어이름/中文名", key: "ch", width: 22 },
            { header: "재질/材质", key: "texture", width: 20 },
            { header: "수량/数量", key: "amount", width: 20 },
            { header: "국내운송장번호/国内快递单号", key: "number", width: 40 },
            {
                header: "신고단가（$）/申报价格（美金）",
                key: "price",
                width: 40,
            },
            { header: "HS CODE/海关编码", key: "hscode", width: 30 },
            { header: "박스번호라벨/发货编号", key: "boxnumber", width: 30 },
        ];

        productList.forEach((myobj, idx) => {
            worksheet.addRow(myobj);
            worksheet.getRow(idx + 2).height = 100;
            promise.push(
                html2canvas(document.querySelector(`#img${myobj["idx"]}`)).then(
                    (canvas) => {
                        let imageURL = canvas.toDataURL();
                        const imageId2 = workbook.addImage({
                            base64: imageURL,
                            extension: "png",
                        });
                        worksheet.addImage(imageId2, `B${idx + 2}:B${idx + 2}`);
                    }
                )
            );
        });

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
                elem.download = `${fileName}.xlsx`;
                document.body.appendChild(elem);
                elem.style = "display: none";
                elem.click();
                elem.remove();
            });
        });
    }
};
export default exceljs;
