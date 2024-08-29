import Translate from './components/Translate'
import './App.css'


function App() {

  return (
    <>
      <footer id="colophon" className="site-footer black" role="contentinfo">
        <div className="container" id="binaryImg">
          <div className="row">
            <div className="col-sm-7 white-text canvas__container" id="footer-col-left">

              <div className="form-wrapper">
                <div className="canvas__wrapper">
                  <Translate />
                </div>
                <span className="input input--minoru">

                </span>
              </div>
              <div id="resized"></div>
              <div id="error-success"></div>
              <div id="preview"></div>
              <div id="controls" className="hidden">
                <div>Width:<span id="width"></span></div>
                <div>Height:<span id="height"></span></div>
                <div>Size:<span id="size"></span></div>
              </div>
            </div>
            {/* <div className="col-sm-5 white-text text-left" id="footer-col-right">
              <hr />
              <h3>Support</h3>
              <p>My work is only sustainable if I have the means to buy supplies, tools, food, rent, gas, you get the point. If you're enjoying the work that I am doing, please consider purchasing my work through Bandcamp or becoming a Patreon supporter. Sharing my work with friends and family who you suspect might be interested is also a great way of supporting my work if money is tight. Thank you!</p>
              <div className="row">
                <div className="col-sm-6 col-xs-6">
                  <a href="https://www.patreon.com/alifeinbinary" target="_blank"><img className="support-link img-responsive" src="app/themes/alifeinbinary/img/patreon_banner_2.png" alt="Support through Patreon" /></a>
                </div>

                <div className="col-sm-6 col-xs-6">
                  <a href="https://theves.bandcamp.com/" target="_blank"><img className="support-link img-responsive" src="app/themes/alifeinbinary/img/bandcamp_banner_2.png" alt="Purchase through Bandcamp" /></a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
