import React, { ReactNode } from 'react'

type Props = {
  title: string
  children?: ReactNode
}

const MainPanel = ({title, children}: Props) => {
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