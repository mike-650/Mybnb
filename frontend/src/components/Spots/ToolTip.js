import { useState } from "react";

function ToolTip({name, previewImage}) {
  const [ showToolTip, setToolTip ] = useState('tool-tip-disabled');
  return (
    <div className="tool-tip-container">
    <h4 className={showToolTip}>{name}</h4>
       <img
            title={name}
            src={previewImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://www.clipartmax.com/png/middle/155-1550474_image-is-not-available-home-button-transparent-background.png';
            }}
            alt='Not Available'
            className='all-spots-images'
            onMouseEnter={() => setToolTip('tool-tip-enabled')}
            onMouseLeave={() => setToolTip('tool-tip-disabled')}
            />
    </div>

  )
}

export default ToolTip;
