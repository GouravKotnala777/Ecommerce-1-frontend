import { NavLink } from "react-router-dom";
import "../styles/components/footer.scss";

const FooterLinkFields = [
    {heading:"LINK", links:[
        {linkUrl:"blog", placeHolder:"Blog"},
        {linkUrl:"product-reviews", placeHolder:"Product Reviews"},
        {linkUrl:"faqs", placeHolder:"FAQs"},
        {linkUrl:"train-with-us", placeHolder:"Train with us"},
        {linkUrl:"track-your-order", placeHolder:"Track Your Order"},
        {linkUrl:"bmi-calculator", placeHolder:"BMI Calculator"},
        {linkUrl:"macro-calculator", placeHolder:"Macro Calculator"},
        {linkUrl:"fitness-tools-calculator", placeHolder:"Fitness Tools and Calculator"}
    ]},
    {heading:"INFORMATIONS", links:[
        {linkUrl:"policy/privacy", placeHolder:"Privacy Policy"},
        {linkUrl:"policy/return-and-refund", placeHolder:"Return and Refund Policy"},
        {linkUrl:"policy/shipping", placeHolder:"Shipping Policy"},
        {linkUrl:"policy/terms-and-conditions", placeHolder:"Terms and Conditions"},
        {linkUrl:"policy/insider-program", placeHolder:"Insider Program"},
        {linkUrl:"policy/insider-membership-terms-of-use", placeHolder:"Insider Membership Terms of Use"}
    ]},
    {heading:"ABOUT", links:[
        {linkUrl:"authenticity", placeHolder:"Authenticity"},
        {linkUrl:"products-we-offer", placeHolder:"Products We Offer"},
        {linkUrl:"contact-us", placeHolder:"Contact Us"},
        {linkUrl:"about-us", placeHolder:"About Us"},
        {linkUrl:"we-care", placeHolder:"We Care"}
    ]},
    {heading:"FEATURED BRANDS", links:[
        {linkUrl:"buy-bigmuscles-nutrition-products-online", placeHolder:"Big Muscle Nutrition"},
        {linkUrl:"buy-gnc-products-online", placeHolder:"GNC"},
        {linkUrl:"buy-muscle-asylum-products-online", placeHolder:"Muscle Asylum"},
        {linkUrl:"buy-muscletech-products-online", placeHolder:"Muscletech"},
        {linkUrl:"buy-qnt-products-online", placeHolder:"QNT"},
        {linkUrl:"buy-zucchero-peanut-butter-products-online", placeHolder:"Zucchero Peanut Butter"},
        {linkUrl:"all-brands", placeHolder:"View all"},
    ]},
    {heading:"REGISTERED ADDRESS", links:[
        {linkUrl:"aaa", placeHolder:"Ecommerce-GG"},
        {linkUrl:"aaa", placeHolder:"#71, New Bhoor Colony, Faridabad, Haryana, 121002"},
        {linkUrl:"aaa", placeHolder:"+91-8882732859"},
        {linkUrl:"aaa", placeHolder:"gouravkotnala777@gmail.com"}
    ]},
    {heading:"DOWNLOAD OUR APP", links:[
        {linkUrl:"appple-store", placeHolder:"Big Muscle Nutrition"},
        {linkUrl:"goooogle-store", placeHolder:"GNC"}
    ]}
];

const Footer = () => {

    return(
        <div className="footer_cont">
            <div className="links_cont">
                {

                    FooterLinkFields.map((q, indexq) => (
                        <div className="link_cont" key={indexq}>
                            <h3>{q.heading}</h3>
                            {
                                q.links.map((w, indexw) => (
                                    <NavLink className="footer_navlink" key={indexw} to={`${w.linkUrl}`}>{w.placeHolder}</NavLink>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <div className="about_our_organization">
                <h2>ABOUT ECOMMERCE-GG</h2>
                <p>ECOMMERCE-GG is chain of online & offline supplement stores, we provide all kinds of genuine health supplements at a very affordable prices along with free delivery pan India. We started our journey 10 years back in FARIDABAD, HARYANA by starting our offline supplement store by the name of ECOMMERCE-GG & online store BEASTNUTRITION.STORE in 2020. With the love & support of our respected clients we have 2 offline stores & online supplement stores by the name of ECOMMERCE-GG. We ship throughout India with full guarantee & authenticity. You can easily rely on us for your supplement requirements. We directly deal with prominent importers & we are distributors of leading supplements brands of India.</p>

                <h3>Why we started?</h3>
                The main purpose to start our supplement business is to provide original & genuine health supplements to masses, Health is the real wealth & in India people have less knowledge about supplements, also duplicity is at peak in this field. We are into this business because of our passion to make masses healthy & to show them the right path. Our team consists of Certified Sports Nutritionists & Qualified Personal Trainers who are always available to guide you. 

                <h3>What’s special about us?</h3>
                We are a team of Certified health professionals, we guide on the basis of scientific & practical knowledge, We provide genuine supplements at very affordable prices, We provide free shipping pan India, We provide free counseling sessions, We are purely committed towards our clients, We provide supplements on the basis of your goals.

                <h3>Brands We Deals In:</h3>
                <p>We deal in wide range of brands including, Dymatize, Optimum Nutrition, My Protein, One Science, Rule 1, Labrada, Biotech, Ronnie Coleman, GNC, Ultimate Nutrition, Muscle Pharm, International Protein, Muscle Tech, ABSN, Dedicated, MHP, Isopure, Big Muscles AND MORE….</p>

                <p>BRANDS PROTEINS PRE-WORKOUTS INTRA-WORKOUTS POST-WORKOUTS RECOVERY GAINERS FAT LOSS WELLNESS VITAMINS & MINERALS SHOP BY GOAL TOP 10 RECENTLY ADDED TRAIN WITH US CONSULT INDIA’S #1 ONLINE SUPPLEMENT STORE – ECOMMERCE-GG MACRO CALCULATOR FITNESS TOOLS AND CALCULATORS BMI CALCULATOR</p>
                <h3>Copyright © 2020 ECOMMERCE-GG.  All Rights Reserved.</h3>

                <p>Technical Partner - Snacksoft Infosystems</p>

                <p>* Disclaimer: These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure or prevent any disease. Product results may vary from person to person.</p>
                <p>*Always consult with a qualified healthcare professional prior to beginning any diet or exercise program or taking any dietary supplement. Information provided on this site is solely for informational purposes only. It is not a substitute for professional medical advice.</p>
                <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
            </div>
        </div>
    )
};

export default Footer;