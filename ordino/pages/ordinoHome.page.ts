import { expect } from '@playwright/test';
import { Page } from 'playwright';
import { LoginPage } from './ordinoLogin.page';
import { OrdinoSidePanel } from './panels/ordinoSidePanel';
import { oi } from '@ordino.ai/ordino-engine';

export class HomePage {

    private btn_profile = '(//img[@alt="profile picture"])[1]';
    page: Page;
    sidePanel: OrdinoSidePanel;

    constructor(page: Page) {
        this.page = page;
        this.sidePanel = new OrdinoSidePanel(this.page);
    }

    public step_searchOption() {
        this.sidePanel.step_searchOption();
        return this;
    }

     async step_profileOption(options: string) {
        await oi.ui(this.page).button(this.btn_profile).click(); 
        // Wait for dropdown menu to appear
        await this.page.waitForTimeout(500);      
        oi.ui(this.page).button("//ul[@role='menu']//a[contains(text(), '" + options + "')]").click();
        return this;
    }
} 