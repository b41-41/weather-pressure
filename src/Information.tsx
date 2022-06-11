import React, { ReactElement } from 'react';

type Props = { pressure?: number };

const Information = (props: Props) => {
  const { pressure } = props;
  const STANDARD_PRESSURE = 1013;

  const selectColor = (): string => {
    if (!pressure) {
      return 'red';
    } else if (pressure > STANDARD_PRESSURE) {
      return 'green';
    } else if (pressure === STANDARD_PRESSURE) {
      return 'green';
    } else if (pressure < STANDARD_PRESSURE) {
      return 'red';
    }
    return 'red';
  };

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

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: selectColor(),
        color: 'white',
        fontWeight: 'bolder',
        fontSize: '4rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {printPage()}
      </div>
    </div>
  );
};

export default Information;
