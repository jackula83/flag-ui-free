import React, { ReactNode } from 'react'

interface IProps {
  title: string
  page: ReactNode
}

const MainPanel: React.FC<IProps> = ({title, page}) => {
  return (
    <>    
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">{title}</h3>
            </div>
            <div className="row">
              {page}
            </div>
          </div>
        </div>
    </>
  )
}

export default MainPanel;