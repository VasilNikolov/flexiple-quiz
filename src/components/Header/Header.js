import React from 'react'

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'

export default class HeaderComponent extends React.Component {

  render() {

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <h1>Flexiple quiz</h1>
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}
