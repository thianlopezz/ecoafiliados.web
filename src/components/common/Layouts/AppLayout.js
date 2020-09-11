import MenuBar from '../MenuBar';
import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { palette } from '../../../theme';
import GlobalStyle from '../../../theme/GlobalStyle';

const theme = createMuiTheme({
  palette: palette,
});

export default class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideTabs: false,
    };
    this.listenScrollEvent = this.listenScrollEvent.bind(this);
  }
  listenScrollEvent(e) {
    const window = e.currentTarget;
    if (this.prev > window.scrollY) {
      //UP
      this.setState({ hideTabs: false });
    } else if (this.prev < window.scrollY) {
      //DOWN
      this.setState({ hideTabs: true });
    }
    this.prev = window.scrollY;
  }
  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollEvent);
  }

  render() {
    const { props } = this;
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <div style={props.style}>{props.children}</div>
      </ThemeProvider>
    );
  }
}
