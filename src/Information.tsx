import React, { ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

type Props = { pressure?: number };

const Information = (props: Props) => {
  const { pressure } = props;
  const STANDARD_PRESSURE = 1013;

  const [color, setColor] = useState<string>('red');

  const selectColor = (): void => {
    if (!pressure) {
      setColor('#AA0000');
    } else if (pressure > STANDARD_PRESSURE) {
      setColor('#006A4E');
    } else if (pressure === STANDARD_PRESSURE) {
      setColor('#006A4E');
    } else if (pressure < STANDARD_PRESSURE) {
      setColor('#AA0000');
    }
  };

  useEffect(selectColor, [pressure]);

  const printPage = (): ReactElement => {
    if (!pressure) {
      return <>오류! 값이 없습니다.</>;
    } else if (pressure > STANDARD_PRESSURE) {
      return (
        <>
          고기압!
          <br />({pressure})
        </>
      );
    } else if (pressure === STANDARD_PRESSURE) {
      return (
        <>
          가장 좋은 상태
          <br />({pressure})
        </>
      );
    } else if (pressure < STANDARD_PRESSURE) {
      return (
        <>
          저기압
          <br />({pressure})
        </>
      );
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '10%',
            backgroundColor: '#48489d',
          }}
        >
          Low Pressure
        </div>
        <div
          style={{
            position: 'absolute',
            fontWeight: 800,
            lineHeight: 1.5,
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
