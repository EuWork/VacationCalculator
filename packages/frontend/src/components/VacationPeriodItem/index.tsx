import { Space } from "antd";

interface VacationPeriodInterface {
  from: string;
  to: string;
  isChange: boolean;
}

function VacationPeriodItem({ from, to, isChange }: VacationPeriodInterface) {
  return (
    <Space>
      <div>Начало: {from}</div>
      <div>конец: {to}</div>
    </Space>
  );
}

export default VacationPeriodItem;
