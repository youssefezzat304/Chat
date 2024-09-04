"use client";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useState } from "react";
import { GrMicrophone } from "react-icons/gr";
import { LuFiles, LuMusic4 } from "react-icons/lu";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineVideoCamera } from "react-icons/hi";

import styles from "./index.module.css";
import { IoLink } from "react-icons/io5";
import PrivateChatImages from "@/_components/List/PrivateChatImages";

export default function ChatInfoUtilities() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className={styles.container}>
      <Accordion
        className={styles.accordion}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        disableGutters={true}
      >
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className={styles.accordionTitle}>
            <TbPhotoSquareRounded />
            Photos
          </div>
        </AccordionSummary>
        <AccordionDetails className={styles.photos}>
          <PrivateChatImages />
        </AccordionDetails>
      </Accordion>

      <Accordion
        className={styles.accordion}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        disableGutters={true}
      >
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div className={styles.accordionTitle}>
            <LuFiles />
            Files
          </div>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>

      <Accordion
        className={styles.accordion}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        disableGutters={true}
      >
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div className={styles.accordionTitle}>
            <LuMusic4 />
            Audio files
          </div>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>

      <Accordion
        className={styles.accordion}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        disableGutters={true}
      >
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <div className={styles.accordionTitle}>
            <HiOutlineVideoCamera />
            Videos
          </div>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>

      <Accordion
        className={styles.accordion}
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
        disableGutters={true}
      >
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <div className={styles.accordionTitle}>
            <IoLink />
            Shared links
          </div>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>

      <Accordion
        className={styles.accordion}
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
        disableGutters={true}
      >
        <AccordionSummary aria-controls="panel4bh-content" id="panel4bh-header">
          <div className={styles.accordionTitle}>
            <GrMicrophone />
            Voice messages
          </div>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </div>
  );
}
