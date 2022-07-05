import { exchangeHscodeFormat } from '../../utils';
import { ImgBox, ImgBtn, Input, LableForIgmBtn, PriceInput, Row } from './style';

const selectImg = (img, i) => {
  const preview = new FileReader();
  preview.onload = e => {
    document.getElementById(`img${i}`).src = e.target.result;
  };
  preview.readAsDataURL(img.target.files[0]);
};

const inputChange = ({ e, hscodes, setHscodes, index }) => {
  const newcodes = [...hscodes];
  const hscode = e.target.value;
  const newCode = exchangeHscodeFormat({ hscode });

  newcodes[index] = newCode;
  setHscodes(newcodes);
};

function DataSaveRow({ index, hscodes, setHscodes }) {
  return (
    <Row id={index} key={index}>
      <td>{index + 1}</td>
      <td>
        <ImgBox>
          <img src="" alt="" id={`img${index}`} />
        </ImgBox>
        <LableForIgmBtn htmlFor={`file${index}`}>업로드</LableForIgmBtn>
        <ImgBtn type="file" id={`file${index}`} onChange={img => selectImg(img, index)}></ImgBtn>
      </td>

      <td>
        <Input></Input>
      </td>
      <td>
        <Input></Input>
      </td>
      <td>
        <Input></Input>
      </td>

      <td>
        <Input></Input>
      </td>
      <td>
        <Input size={10} as="input"></Input>
        <Input size={10} as="input"></Input>
      </td>
      <td>
        <Input></Input>
      </td>
      <td>
        <span>¥</span>
        <PriceInput size={10}></PriceInput>
      </td>
      <td>
        <Input
          value={hscodes[index]}
          onChange={e => inputChange({ e, hscodes, setHscodes, index })}
          maxLength="12"
          as="input"
        ></Input>
      </td>
      <td>
        <Input size={10}></Input>
      </td>
    </Row>
  );
}

export default DataSaveRow;
