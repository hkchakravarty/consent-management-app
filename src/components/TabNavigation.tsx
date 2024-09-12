import React from "react";
import { useNavigate } from "react-router-dom";
import { SidePanel, Tab } from "../styles/shared-styles";
import { useTranslation } from "react-i18next";

interface TabNavigationProps {
  activeTab: "give-consent" | "collected-consents";
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <SidePanel>
      <Tab
        $active={activeTab === "give-consent"}
        onClick={() => navigate("/give-consent")}
      >
        {t("navigation.giveConsent")}
      </Tab>
      <Tab
        $active={activeTab === "collected-consents"}
        onClick={() => navigate("/collected-consents")}
      >
        {t("navigation.collectedConsents")}
      </Tab>
    </SidePanel>
  );
};

export default React.memo(TabNavigation);
