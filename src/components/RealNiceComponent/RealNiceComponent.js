import $ from 'jquery';

import './RealNiceComponent.scss';

const niceDomStringBuilder = () => {
  const domString = 'Nuts grow on trees';
  $('#nice').html(domString);
};

export default niceDomStringBuilder;
