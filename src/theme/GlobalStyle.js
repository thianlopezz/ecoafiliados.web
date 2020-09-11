import { createGlobalStyle } from 'styled-components';
import { palette, CSS_FONTS } from '.';
const GlobalStyle = createGlobalStyle`

@import url(${CSS_FONTS.FONTS_URL.BODY});
@import url(${CSS_FONTS.FONTS_URL.MENU});
html {
  height: 100%;
}
body {
  
    font-family: ${CSS_FONTS.FONTS.BODY};

  
}
h1, h2, h3, h4, h5, h6 {
    color:${palette.dark.dark};
    margin-block-start: .3em;
    margin-block-end: .3em;
    font-family: 'Poppins', sans-serif;
    overflow-wrap: break-word;

}




.navbar-nav .nav-link {
    font-family: ${CSS_FONTS.FONTS.MENU};
    font-size:1.2rem;
    
}


p{
    font-size:.9em;
    color:${palette.dark.gray};
    margin-block-start: .3em;
    margin-block-end: .3em;
}`;

export default GlobalStyle;
