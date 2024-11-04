import "../styles/components/tab.scss";
import { ReactElement, useState } from "react";
import { PRIMARY, SECONDARY } from "../styles/utils";

interface PaneslArrayTypes{
    name:string;
    children:ReactElement;
}

const Tab = ({panelsArray}:{panelsArray:PaneslArrayTypes[]}) => {
    const [selectedTab, setSelectedTab] = useState<string>(panelsArray[0].name);

    return(
        <div className="tab_panel">
            <div className="tabs_cont">
                {
                    panelsArray.map((item, index) => (
                            
                        <button className="tab" key={index} value={item.name} style={{
                            background:item.name === selectedTab ? `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})` : "white",
                            color:item.name === selectedTab ? "white" : "#515151",
                            boxShadow:item.name === selectedTab ? "0px 0px 3px 1px rgba(0,0,0,0.3) inset" : "0px 0px 5px 1px rgba(0,0,0,0.1)"
                        }} onClick={(e) => setSelectedTab(e.currentTarget.value)}>{item.name}</button>
                    ))
                }
                
            </div>
            <div className="panel_cont">
                {
                    panelsArray.map((item, index) => (
                        item.name === selectedTab &&
                        <span key={index}>
                            {item.children}
                        </span>
                    ))
                }
            </div>
        </div>
    )
};

export default Tab;