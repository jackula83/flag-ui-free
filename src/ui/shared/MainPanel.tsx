import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom';
import { Row } from 'ui/Row';

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
            <Row>
              <div className="page-header">    
                <h3 className="page-title">
                  {returnUrl &&       
                    <div className="btn btn-primary btn-sm me-3" onClick={() => navigate(returnUrl)}>
                      <i className="mdi mdi-keyboard-backspace"></i>
                    </div>
                  }
                  {title}
                </h3>
              </div>
            </Row>
            <div className="row">
              {children}
            </div>
          </div>
        </div>
    </>
  )
}

export default MainPanel;