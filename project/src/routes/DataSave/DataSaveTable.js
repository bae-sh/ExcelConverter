import DataSaveHeader from './DataSaveHeader';
import DataSaveRow from './DataSaveRow';
import { Table } from './style';

const dataRows = ({ hscodes, setHscodes, countSize, setCountSize }) => {
  const rows = [];

  for (let index = 0; index < 20; index++) {
    rows.push(
      <DataSaveRow
        index={index}
        hscodes={hscodes}
        setHscodes={setHscodes}
        key={index}
        countSize={countSize}
        setCountSize={setCountSize}
      />,
    );
  }
  return rows;
};

function DataSaveTable({ hscodes, setHscodes, countSize, setCountSize }) {
  return (
    <Table>
      <thead>
        <DataSaveHeader />
      </thead>
      <tbody>{dataRows({ hscodes, setHscodes, countSize, setCountSize })}</tbody>
    </Table>
  );
}

export default DataSaveTable;
