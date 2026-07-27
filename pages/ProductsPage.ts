import {Locator, Page} from "@playwright/test";

export class ProductsPage {
    readonly page: Page;
    readonly filterOpenButton: Locator;
    readonly filterContainer: Locator;
    readonly filterDescDate: Locator;
    readonly filterSubmit: Locator;
    readonly productsContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.filterOpenButton = page.locator('img[class*="filterForProducts_filterIcon"]')
        this.filterContainer = page.locator('div[class*="filterForProducts_container"]')
        this.filterDescDate = this.filterContainer.getByText("From latest to oldest");
        this.filterSubmit = page.locator('div[class*="filterForProducts_buttons"]').getByText('Submit')
        this.productsContainer = page.locator('div[class="products"]');
    }

    async gotoProductsPage(){
        await this.page.goto('/products')
    }

    async setSort(sortingMethod:string){
        if(sortingMethod=='descDate'){
        await this.filterOpenButton.click();
        await this.filterContainer.isVisible();
        await this.filterDescDate.click();
        await this.filterSubmit.click();
        }else{ throw new Error('Such sorting label not added to test')}

    }

    async checkLastThreeProductPresent(productinfo:any){

        await this.setSort('descDate')
        await this.page.waitForTimeout(5000)

        // loop through first 3 items
        const items = (await this.productsContainer.locator('[class*="main-product"]').all()).slice(0,3)
        for(const item of items){
            const categoryName:string = await item.locator('div.category-price h6').innerText();
            // removing last symbol of currency with trim
            const price:number = Number((await item.locator('div.category-price p').innerText()).slice(0,-1));
            const name:string = await item.locator('a>h6').innerText();

                if(categoryName === productinfo.category &&
                    price === productinfo.price &&
                    name === productinfo.name){
                    return true
                }
        }
    }
}