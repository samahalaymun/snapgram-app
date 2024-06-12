
import {Helmet} from "react-helmet"

function Meta({ title, homePage }:{title:string,homePage:boolean}) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`${title}${homePage ? "" : " | "}SnapGram`}</title>
    </Helmet>
  );
}

export default Meta