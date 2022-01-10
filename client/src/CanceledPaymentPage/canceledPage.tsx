import { Link } from 'react-router-dom';
import './canceledPage.css';

function CanceledPage() {
  return (
    <div className="container text-center">
      <div className="row mt-5">
        <div className="card card-custom bg-white border-white border-0">
          <div className="card-custom-img card-bg"></div>
          <div className="card-custom-avatar">
          </div>
          <div className="card-body overflow">
            <h4 className="card-title">Ditt köp har ej genomförts</h4>
            <p className="card-text">
              Vi har ej mottagit din betalning, någonting verkar ha gått fel. 
          </p>
          <p className="card-text">Var vänlig att göra ett nytt försök om du vill boka din resa.</p>
          </div>
          <div className="card-footer footer-style">
            <Link to='/'><button className="btn btn-primary mb-5">Boka resa</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CanceledPage;
