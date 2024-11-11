import { ChangeEvent, useEffect, useState } from "react";
import "../styles/components/slider.scss";
//import a from "/a.jpg";
//import b from "/b.jpg";
//import c from "/c.jpg";
//import d from "/d.jpg";
//import e from "/e.jpg";
import { Link } from "react-router-dom";
import { useGetHeroSliderQuery, useInsertNewHeroSliderImgMutation, useUpdateHeroSliderMutation } from "../redux/api/api";
import { BiInfoCircle } from "react-icons/bi";

//const imageArray = [a, b, c, d, e];
//const numArray = [0,1,2,3,4];

const Slider = () => {
    const {data}:{
        data?:{success:boolean; message:{imageURL:string; linkURL:string;}[];}
    } = useGetHeroSliderQuery("");
    const [imagePosition, setImagePosition] = useState<number>(0);
    const [insertNewSliderImg] = useInsertNewHeroSliderImgMutation();
    const [updateSliderImg] = useUpdateHeroSliderMutation();
    const [linkURL, setLinkURL] = useState<string>("");
    const [image, setImage] = useState<File|null>(null);
    const [selectedImageSlot, setSelectedImageSlot] = useState<string>("");

    const scrollLeftHandler = () => {
        if (imagePosition > 0) {
            setImagePosition((prev) => prev-1);
            console.log(imagePosition);
        }
        else{
            setImagePosition(4);
            console.log(imagePosition);
        }
    };
    const scrollRightHandler = () => {
        if (imagePosition < 4) {
            setImagePosition((prev) => prev+1);
            console.log(imagePosition);
            
        }
        else{
            setImagePosition(0);
            console.log(imagePosition);
        }
    };

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
        else {
            setLinkURL(e.target.value);
        }
    };
    const insertNewSliderImgHandler = async() => {
        if (!image) {
            console.log({image});
            return null;
        }
        const formData = new FormData();
        formData.append("linkURL", linkURL);
        formData.append("image", image);
        const res = await insertNewSliderImg(formData);

        console.log({linkURL});
        console.log({image});
        
        if (res.data) {
            console.log(res.data);
            setImage(null);
            setLinkURL("");
        }
        if (res.error) {
            console.log(res.error);
            setImage(null);
            setLinkURL("");
        }
    };
    const updateSliderImgHandler = async({position}:{position:0|1|2|3|4;}) => {
        try {
            const formData = new FormData();

            if (linkURL) formData.append("linkURL", linkURL);
            if (image) formData.append("image", image);
            formData.append("position", position.toString());

            const res = await updateSliderImg(formData);

            console.log({linkURL});
            console.log({image});
            
            if (res.data) {
                console.log(res.data);
                setImage(null);
                setLinkURL("");
                setSelectedImageSlot("")
            }
            if (res.error) {
                console.log(res.error);
                setImage(null);
                setLinkURL("");
                setSelectedImageSlot("")
            }            
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (selectedImageSlot) {
            document.body.classList.add("freeze");
        }
        else{
            document.body.classList.remove("freeze");
        }        
    }, [selectedImageSlot]);

    return(
        <>
            <div className="slider_slot_tooltip_closer" style={{display:selectedImageSlot?"block":"none"}} onClick={() => {setSelectedImageSlot("")}}>
            
            </div>
            <div className="slider_cont">
                {/*<pre>{JSON.stringify(data, null, `\t`)}</pre>*/}
                <button className="left_arrow" onClick={scrollLeftHandler}>Left</button>
                <button className="right_arrow" onClick={scrollRightHandler}>Right</button>
                <div className="images_cont">
                    <div className="image_scrollable" style={{transform:`translate(${-20*imagePosition}%, 0)`}}>
                        {
                            data?.message.map((item) => (
                                <Link to={item.linkURL} className="image_cont">
                                    <img src={item.imageURL} alt={item.imageURL} />
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className="image_count_slots">
                    {
                        data?.message.map((item, index) => (
                            <div key={index} className="image_slot" style={{backgroundImage:`url(${item.imageURL.split("/upload")[0]}/upload/w_80,h_50/${item.imageURL.split("/upload")[1]})`, backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover"}}
                                onClick={() => {
                                    setSelectedImageSlot(item.imageURL);
                                }
                            }>
                                <div className="hero_slider_slot_tooltip" style={{transform:selectedImageSlot === item.imageURL?"scale(1,1.1)":"scale(1,0)"}}>
                                    <input type="text" name="linkURL" placeholder="Link URL" onChange={(e) => onChangeHandler(e)} />
                                    <input type="file" name="image" placeholder="Image URL" onChange={(e) => onChangeHandler(e)} />
                                    <button onClick={() => updateSliderImgHandler({position:index as 0|1|2|3|4})}>Update</button>
                                    {/*<button><MdDelete className="MdDelete" /></button>*/}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            
            {
                (data === undefined || data?.message.length < 5) &&
                    <div className="slider_form_cont">
                        <input type="text" name="linkURL" placeholder="Link Url" onChange={(e) => onChangeHandler(e)} />
                        <input type="file" name="image" onChange={(e) => onChangeHandler(e)} />
                        <button onClick={insertNewSliderImgHandler}>Upload</button>
                        <span className="slider_form_cont_warning">
                            <BiInfoCircle /> <span>this form will be disappear once all image splots are filled. And reappear if any of them become empty.</span>
                        </span>
                    </div>
            }
        </>
    )
};

export default Slider;