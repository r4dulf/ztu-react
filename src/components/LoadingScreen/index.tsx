import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { mainColor } from '../../scssVars';

export const LoadingScreen = () => (
  <div className='loading-screen'>
    <FontAwesomeIcon icon={faSpinner} spin size='4x' color={mainColor} />
  </div>
);
