import React, { ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

type Props = { pressure?: number };

const Information = (props: Props) => {
  const { pressure } = props;
  const STANDARD_PRESSURE = 1013;

  const [color, setColor] = useState<string>('red');

  const selectColor = (): void => {
    if (!pressure) {
      setColor('red');
    } else if (pressure > STANDARD_PRESSURE) {
      setColor('green');
    } else if (pressure === STANDARD_PRESSURE) {
      setColor('green');
    } else if (pressure < STANDARD_PRESSURE) {
      setColor('red');
    }
  };

  useEffect(selectColor, []);

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
    <>
      <Helmet>
        <meta name="theme-color" content={color} />
      </Helmet>
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          backgroundColor: color,
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
    </>
  );
};

export default Information;
