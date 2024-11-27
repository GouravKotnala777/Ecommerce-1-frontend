import "../../styles/components/back_btn.scss";
import { useParams } from "react-router-dom"
import BackBtn from "../../components/BackBtn";

//enum PolicyType {
//    privacy="privacy",
//    return_and_refund="return-and-refund",
//    shipping="shipping",
//    terms_and_conditions="terms-and-conditions",
//    insider_program="insider-program",
//    insider_membership_terms_of_use="insider-membership-terms-of-use"
//}


const Policies = () => {
    const {policyType} = useParams();

    return(
        <div className="policies_bg">
            <BackBtn />

            {
                policyType === "privacy" &&
                    <div className="privacy_policy">
                    <Heading heading="Privacy Policy" fontSize="1rem" />

                    <Para para="At https://ecommerce-1-frontend.vercel.app, accessible from https://ecommerce-1-frontend.vercel.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by https://ecommerce-1-frontend.vercel.app and how we use it." />
                    <Para para="If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us." />
                    <Para para="This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in https://ecommerce-1-frontend.vercel.app. This policy is not applicable to any information collected offline or via channels other than this website." />

                    <Heading heading="Consent" fontSize="1rem" />

                    <Para para="By using our website, you hereby consent to our Privacy Policy and agree to its terms." />

                    <Heading heading="Information we collect" fontSize="1rem" />

                    <Para para="The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information." />
                    <Para para="If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide." />
                    <Para para="When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number." />

                    
                    <Heading heading="How we use your information" fontSize="1rem" />

                    <Para para="We use the information we collect in various ways, including to:" />

                    <List listArray={[
                        "Provide, operate, and maintain our website",
                        "Improve, personalize, and expand our website",
                        "Understand and analyze how you use our website",
                        "Develop new products, services, features, and functionality",
                        "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes",
                        "Send you emails",
                        "Find and prevent fraud"
                    ]} />

                    <Heading heading="Log Files" fontSize="1rem" />

                    <Para para="https://ecommerce-1-frontend.vercel.app follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services’ analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information." />

                    <Heading heading="Cookies and Web Beacons" fontSize="1rem" />
                    <Para para="Like any other website, https://ecommerce-1-frontend.vercel.app uses ‘cookies’. These cookies are used to store information including visitors’ preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users’ experience by customizing our web page content based on visitors’ browser type and/or other information." />

                    <Heading heading="Google DoubleClick DART Cookie" fontSize="1rem" />
                    <Para para="Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads" />

                    <Heading heading="Advertising Partners Privacy Policies" fontSize="1rem" />
                    <Para para="You may consult this list to find the Privacy Policy for each of the advertising partners of https://ecommerce-1-frontend.vercel.app." />
                    <Para para="Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on https://ecommerce-1-frontend.vercel.app, which are sent directly to users’ browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit." />
                    <Heading heading="Note that https://ecommerce-1-frontend.vercel.app has no access to or control over these cookies that are used by third-party advertisers." fontSize="0.8rem" />

                    <Heading heading="Third Party Privacy Policies" fontSize="1rem" />
                    <Para para="https://ecommerce-1-frontend.vercel.app’s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options." />
                    <Para para="You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites." />

                    

                    <Heading heading="CCPA Privacy Rights (Do Not Sell My Personal Information)" fontSize="1rem" />
                    <Heading heading="Under the CCPA, among other rights, California consumers have the right to:" fontSize="0.8rem" />
                    <List listArray={[
                        "Request that a business that collects a consumer’s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.",
                        
                        "Request that a business delete any personal data about the consumer that a business has collected.",
                        
                        "Request that a business that sells a consumer’s personal data, not sell the consumer’s personal data.",
                        
                        "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us."
                    ]} />

                    <Heading heading="GDPR Data Protection Rights" fontSize="1rem" />
                    <Heading heading="We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:" fontSize="0.8rem" />
                    <List listArray={[
                        "The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.",

                        "The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.",

                        "The right to erasure – You have the right to request that we erase your personal data, under certain conditions.",

                        "The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.",

                        "The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.",

                        "The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.",

                        "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us."
                    ]} />

                    <Heading heading="Children’s Information" fontSize="1rem" />
                    <Para para="Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity." />
                    <Para para="https://ecommerce-1-frontend.vercel.app does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records." />
                </div>
            }
            {
                policyType === "return-and-refund" &&
                    <div className="return_refund_policy_bg" style={{padding:"10px", textAlign:"justify"}}>
                        <Heading heading="Return and Refund Policy" fontSize="1rem" />
                        <Para para="Our return policy is defined to make the return & cancellation easy and a simple process for the customer. We have a 7-day return policy in case of receiving damaged, defective or different /wrong items delivered to you. In this case, we will provide a full refund or free replacement as applicable. However, we would require an unboxing video of the product because it’s a healthcare product. We will need the unboxing video to ascertain the damage or defect in the product before issuing refund and replacement. Below are the other return and cancellation policy basis which you can replace or refund the item." />

                        <List listArray={[
                            "Do not acknowledge any product/item that looks tampered at the time of receiving the product.",
                            "Please make an unboxing video while opening the packaging as supporting evidence, if you find a broken seal or any damage to the product.",
                            "Do not break the seal of the product, in case of any doubts or queries concerning the product authenticity.",
                            "Once the product/item seal is broken; we do not accept return or replacement for the product.",
                            "2-way shipping/travelling charges will be deducted from the refunded amount.",
                        ]} />

                        <Note heading="Please Note" para="We will not be able to refund or replace the product if the above mentioned points are not followed." />
                        <Note heading="Recommendation" para=" Some products like BCAA, pre-workout and, other dietary supplements are hygroscopic and they will tend to form lumps. Although the supplements are 100% safe to consume, we recommend shaking the product firmly to break down the lumps and dissolve in the water." />


                        <Para para="For any product related queries, we request you to email or contact the respective brand." />

                        

                        <Heading heading="How does our Packages look?" fontSize="0.9rem" />
                        <Para para="All our Shipments are sealed with our own proprietory Tape with beast nutrition branding in green color. For reference Picture is attached." />

                        <Heading heading="Q: What should I do if I receive a damaged/ wrong item, or if any item is missing in my order?" fontSize="0.8rem" />

                        <Para para="A: If you find a defective, damaged or wrong item as per information on our website or if any item is missing as per ordered quantity, please send a screenshot of the products’ outer packaging, MRP Holograph, item Batch Number and images of items received with invoice copy to our customer care at info@beastnutrition.store or call us on …(contact no.)… (10 am to 6 pm business days)." />

                        <Para para="Once you elevate the issue, we will look over the same and you shall get a revert in 24-48 hrs. In case if the issue is from the respective brand, then we might escalate the concern to the brand or importer. However, in those situations, the procedure might take more than the usual time." />


                        <Para para="As soon as the investigation is over, we will schedule a reverse pickup with the below-listed process:" />

                        <List listArray={[
                            "You have to deliver the Package by any Courier Services within 7 days from the date of Delivery.",
                            "The package should be in intact position when returned to us(Beast Nutrition).",
                            "Once we receive the item/product, the quality analysis team conducts a quality check and updates the management about the product condition, as we need the product/item in the exact condition as delivered to you.",
                            "As soon as we learn the positive outcome of the product, we will get back to you shortly & as per the request, we will refund or replace the order (replacement is subject to availability of the specific item).",
                            "Providing that if we receive a negative outcome/response of the product, it would be sent back to you in the same condition."
                        ]} />

                        <Heading heading="Note – As per our Return Policy, you need to raise concern within 7 days along with complete product images & unboxing videos as mentioned in the policy listed above." fontSize="0.8rem" />
                        <Heading heading="What should I do if I receive a damaged/tampered product?" fontSize="0.8rem" />
                        <Para para="We suggest you not to accept the product from the courier person & kindly share clicked images or videos with us at info@beastnutrition.store or you can contact us on ……(10 am to 6 pm on working days). It will assist us in escalating the issue with our courier partner." />


                        <Note heading="Please Note" para="While in case of this concern, we will generate a new order (same product/item) and will dispatch it to you." />
                        <Note heading="Note" para="*Stock Clearance Products/items are not eligible for Replacement / Returns*" />

                        <Para para="Few exceptions may override for promotional offers. In case of any queries; please write to our customer care on info@beastnutrition.store or call us on ………. (10 am to 6 pm on working days)." />
                    </div>

            }
            {
                policyType === "shipping" &&
                <div className="return_refund_policy_bg" style={{padding:"10px", textAlign:"justify"}}>
                    <Heading heading="Shipping Policy" fontSize="1rem" />
                    <Heading heading="Standard Delivery" fontSize="0.8rem" />
                    <Para para="Estimated Delivery Time 3-7 business days." />

                    <List listArray={[
                        "All orders processing happens on business/working days only, which includes Monday to Friday, from 9 am to 4 pm IST. Orders placed on Saturdays, Sundays, holidays, or after 4 pm IST are shipped from Monday to Friday.",
                        "Stock units/items are shipped out within 24-48 hours.",
                        "Large/bulk quantity purchases may add 1-3 business/working days to shipping. Unit/Item(s) may also be bulk packed.",
                        "Custom items/products can take between 5-15 working/business days to deliver/ship.",
                        "If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone."
                    ]} />

                    <Note heading="NOTE" para="Many of our items are drop shipped directly from the manufacturer." />

                    <Heading heading="What is the Beast Nutrition Shipping Policy?" fontSize="0.8rem" />
                    <Heading heading="What are the shipping rates and delivery Estimates?" fontSize="0.8rem" />
                    <Para para="Shipping charges for your order will be calculated and displayed at checkout. Delivery delays can occasionally occur." />

                    <Heading heading="How do I check my shipment confirmation and order tracking?" fontSize="0.8rem" />
                    <Para para="You will receive a shipment confirmation email once your order has shipped containing your tracking number. The tracking number will be active within 24hours." />

                    <Heading heading="Are there any Customs, Duties and Taxes on the products purchased from Beast Nutrition?" fontSize="0.8rem" />
                    <Para para="Yes, there might be customs or taxes on your product. However, Beast Nutrition is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customers (tariffs, taxes, etc.)" />

                    <Heading heading="Does Beast Nutrition Deliver products outside India?" fontSize="0.8rem" />
                    <Para para="No, currently we are delivering only Pan India and we do not deliver internationally." />
                </div>
            }
            {
                policyType === "terms-and-conditions" &&
                    <div className="return_refund_policy_bg" style={{padding:"10px", textAlign:"justify"}}>
                        <Heading fontSize="1rem" heading="How to use Coupons" />
                        <List listArray={[
                            "First go to coupon page by bottom navigation bar.",
                            "If there is any coupon, click on the coupon code for copy it to clipboard.",
                            "Go to the cart, there should be a arrow pointing towards top-right at the bottom-left of the screen, click on it.",
                            "Coupon input filed will be appear, paste coupon code in it, and press add button.",
                            "Look at the 'Total Price' bellow of coupon input field it will show price after deduction coupon value.",
                            "now click on the buy all button on right side of same component.",
                            "then do further processing for order, in a common way."                            
                        ]} />

                        <Heading fontSize="1rem" heading="How to use Gift Cards" />
                        <List listArray={[
                            "First go to gift cards page by bottom navigation bar.",
                            "If there is any gift card, click on the use now button.",
                            "Now any product you will buy it autometically cost you after reducing gift card amout.",
                            "Always check product price first if selected gift amount has been substracted from product actual price or not."
                        ]} />
                    </div>
            }
        </div>
        

    )
};


export const Note = ({heading, para}:{heading:string; para:string;}) => {
    return(
        <div style={{fontSize:"0.8rem", marginTop:"10px"}}>
            <span style={{fontWeight:"bold"}}>{heading}: </span>
            <span>{para}</span>
        </div>
    )
};
export const Para = ({para}:{para:string;}) => {
    return(
        <p style={{fontSize:"0.8rem", marginTop:"10px", textAlign:"justify"}}>{para}</p>
    )
};
export const Heading = ({heading, fontSize}:{heading:string; fontSize:string;}) => {
    return(
        <div style={{fontSize, fontWeight:"bold", marginTop:"20px"}}>{heading}</div>
    )
};

export const List = ({listArray}:{listArray:string[];}) => {

    return(
        <div style={{fontSize:"0.8rem"}}>
            <ol style={{maxWidth:"590px", margin:"0px auto"}}>
                {
                    listArray.map((item) => (
                        <li style={{marginTop:"20px"}}>{item}</li>
                    ))
                }
            </ol>
        </div>
    )
};
export default Policies;