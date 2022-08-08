import React from "react";
import '../../font/Pacifico-Regular.ttf';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import QuizIcon from '@mui/icons-material/Quiz';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PolicyIcon from '@mui/icons-material/Policy';


import {
  CircleMenu,
  CircleMenuItem,
  TooltipPlacement,
} from "react-circular-menu";
const Header = () => {
  return (
    <>
      <div className="head-sec">
        <div className="logo">
          <h1 className="Pacifico-Regular"><a href="/">SCM<span className="RobotoMono-MediumItalic">JP-MM Dictionary</span></a></h1>
        </div>
        
        <div id="sidemenu">
          <CircleMenu className="circlemenu-sec"
            startAngle={-260}
            rotationAngle={200}
            itemSize={3}
            radius={8}
            /**
             * rotationAngleInclusive (default true)
             * Whether to include the ending angle in rotation because an
             * item at 360deg is the same as an item at 0deg if inclusive.
             * Leave this prop for angles other than 360deg unless otherwise desired.
             */
            rotationAngleInclusive={false}>
            <CircleMenuItem className="CircleMenuItem" tooltip="privacy" tooltipPlacement={TooltipPlacement.Top} >
              <a href="/privacy"> <PolicyIcon /></a>
            </CircleMenuItem>

            <CircleMenuItem className="CircleMenuItem" tooltip="Favorite" tooltipPlacement={TooltipPlacement.Left}>
              <a href="/favorite"> <StarOutlineIcon /></a>
            </CircleMenuItem>
            <CircleMenuItem className="CircleMenuItem" tooltip="Exam" tooltipPlacement={TooltipPlacement.Left}>
              <a href="/exam"> <QuizIcon /></a>
            </CircleMenuItem>
            <CircleMenuItem className="CircleMenuItem" tooltip="paragraph_search" tooltipPlacement={TooltipPlacement.Left}>
              <a href="/paragraph_search">  <GTranslateIcon /></a>
            </CircleMenuItem>
            <CircleMenuItem className="CircleMenuItem" tooltip="FileUploadIcon" tooltipPlacement={TooltipPlacement.Top} >
              <a href="/csv_upload"> <FileUploadIcon /></a>
            </CircleMenuItem>
          </CircleMenu>
        </div>
      </div>
    </>
  );
}
export default Header;