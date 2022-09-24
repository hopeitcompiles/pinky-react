import ProgressBar from 'react-bootstrap/ProgressBar';

function WithLabelExample(now) {
  return <ProgressBar now={now} label={`${now}%`} />;
}

export default WithLabelExample;