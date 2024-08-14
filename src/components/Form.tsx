import { ChangeEvent, Dispatch, SetStateAction } from "react";
import "../styles/components/form.scss";
import Range from "./Range";

export interface FormFieldTypes{
    type:string;
    name:string;
    placeHolder:string;
    options?:string[];
    minAmout?:number;
    maxAmout?:number;
}

interface FormPropTypes{
    heading:string;
    formFields:FormFieldTypes[];
    onChangeHandler:(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => void;
    onClickHandler:() => void;
    aa?:{minPrice:number; maxPrice:number;};
    setAa?:Dispatch<SetStateAction<{minPrice:number; maxPrice:number;}>>
}

const Form = ({heading, formFields, onChangeHandler, onClickHandler, aa, setAa}:FormPropTypes) => {

    return(
        <div className="form_cont" onClick={(e) => {e.stopPropagation()}}>
            <div className="heading_cont">
                {heading}
            </div>
            <div className="fields_cont">
                {
                    formFields.map((field, index) => (
                        field.type === "textArea" ?
                        <textarea key={index} rows={5} name={field.name} placeholder={field.placeHolder+"..."} onChange={(e) => onChangeHandler(e)} />
                        :
                        field.type === "select" ?
                            <select key={index} name={field.name} onChange={(e) => onChangeHandler(e)}>
                                <option unselectable="on" value="">--{field.placeHolder}--</option>
                                {
                                    field.options?.map((option, optionInd) => (
                                        <option key={optionInd} value={option.toLowerCase()} style={{background:option === "" ? "#f1f1f1":"unset"}} disabled={option === ""}>{option}</option>
                                    ))
                                }
                            </select>
                            :
                            field.type === "file" ?
                                <input key={index} type={field.type} name={field.name} placeholder={field.placeHolder} onChange={onChangeHandler} />
                                :
                                field.type === "text" || field.type === "number" ?
                                    <input key={index} type={field.type} name={field.name} placeholder={field.placeHolder} onChange={onChangeHandler} />
                                    :
                                    <></>
                    ))
                }
                {
                    aa &&
                        <Range aa={aa} setAa={setAa as Dispatch<SetStateAction<{minPrice:number; maxPrice:number;}>>} />
                }

                <button onClick={onClickHandler}>{heading}</button>
            </div>
        </div>
    )
};

export default Form;