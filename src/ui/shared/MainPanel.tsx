import React, { ReactNode } from 'react'

interface IProps {
  title: string
  children?: ReactNode
}

const MainPanel = ({title, children}: IProps) => {
  return (
    <>    
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">{title}</h3>
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