import React, { ReactElement } from 'react';

type Props = { pressure?: number };

const Information = (props: Props) => {
  const { pressure } = props;
  const STANDARD_PRESSURE = 1013;

  const printPage = (): ReactElement => {
    if (!pressure) {
      return <>오류! 값이 없습니다.</>;
    } else if (pressure > STANDARD_PRESSURE) {
      return <>고기압! ({pressure})</>;
    } else if (pressure === STANDARD_PRESSURE) {
      return <>가장 좋은 상태 ({pressure})</>;
    } else if (pressure < STANDARD_PRESSURE) {
      return <>저기압 ({pressure})</>;
    }
    return <></>;
  };

  return <div>{printPage()}</div>;
};

export default Information;
