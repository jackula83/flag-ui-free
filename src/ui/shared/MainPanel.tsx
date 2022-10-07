import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string
  returnUrl?: string,
  children?: ReactNode
}

const MainPanel = ({title, children, returnUrl = undefined}: Props) => {

  const navigate = useNavigate();

  return (
    <>    
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="page-header">    
                <h3 className="page-title">
                  {returnUrl &&       
                    <div className="btn btn-primary btn-sm me-3" onClick={() => navigate(-2)}>
                      <i className="mdi mdi-keyboard-backspace"></i>
                    </div>
                  }
                  {title}
                </h3>
              </div>
            </div>
            <div className="row">
              {children}
            </div>
          </div>
        </div>
    </>
  )
}

export default MainPanel;