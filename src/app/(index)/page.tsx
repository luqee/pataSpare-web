import {ImageSlider} from '@/components/landing/Slider'
import {CategoriesSection} from '@/components/landing/Categories'
import {PartsSection} from '@/components/landing/Parts'
import {PromotionSection} from '@/components/landing/Promotion'
import {StoresSection} from '@/components/landing/Stores'
import {BrandsSection} from '@/components/landing/Brands'

export default function Home() {
  return (
    <>
        <ImageSlider />
        <CategoriesSection />
        <PartsSection />
        <PromotionSection />
        <StoresSection />
        <BrandsSection />
    </>
)
}
