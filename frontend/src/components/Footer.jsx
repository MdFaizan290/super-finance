import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footerCompany">
                <h3>Super Finance <i className="fa-regular fa-copyright"></i>   </h3>
                <p>All Rights Reserved.</p>
            </div>

            <div className="footerContact">
                <h4>Contact Us</h4>
                <a className="footerEmail" href="mailto:mdfaizanuddin123@gmail.com">
                    <i className="fa-solid fa-envelope"></i>
                    <span>mdfaizanuddin123@gmail.com</span>
                </a>
                <div className="footerSocials">
                    <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
                    <a href="#" aria-label="X"><i className="fa-brands fa-x-twitter"></i></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;