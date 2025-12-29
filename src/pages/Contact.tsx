import { Input } from "@/components/ui/input"
import img from '../assets/icons-phone.png'
import img2 from '../assets/icons-mail.png'

const Contact = () => {
  return (
    <div className="max-w-337.5 m-auto my-10 md:px-0 px-4">
      <div>
        <h1 className="text-gray-300">Home / <span className="text-black">Cantact</span></h1>
      </div><br />
      <section className="flex md:flex-row flex-col items-start  gap-10">
        <aside className="flex items-start gap-6 flex-col md:w-[35%]">
          <div>
            <div className="flex items-center gap-3">
              <img src={img} alt="" />
              <h1 className="text-[20px] font-bold">Call To Us</h1>
            </div>
            <ul className="text-gray-400 ml-4">
              <li className="hover:text-red-600">We are available 24/7, 7 days a week.</li>
              <li className="hover:text-red-600">Phone: +8801611112222</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <img src={img2} alt="" />
              <h1 className="text-[20px] font-bold">Write To US</h1>
            </div>
            <ul className="text-gray-400 ml-4 ">
              <li className="hover:text-red-600">My Returns</li>
              <li className="hover:text-red-600">My Cancellations</li>
            </ul>
          </div>
          <h1 className="text-[20px] font-bold">My WishList</h1>
        </aside>

        <aside className="md:w-[60%] shadow-sm md:px-8 px-3 py-5">
          <form action="">
            <label className="text-red-600 font-bold text-2xl mb-3" htmlFor="">Profile</label><br />
            <div className="flex justify-between md:gap-10 gap-2">
              <Input type="text" />
              <Input type="text" />
            </div>
            <div className="flex justify-between my-3 md:gap-10 gap-2">
              <Input type="text" />
              <Input type="text" />
            </div>
            <div className="md:mt-10 mt-5">
              <label htmlFor="" className="font-bold">Password Changes</label>
              <Input type="text" />
              <div className="flex md:mt-5 mt-3 gap-8">
                <Input type="text" />
                <Input type="text" />
              </div>
            </div>
            <div className="flex justify-end gap-8 md:my-5 my-3">
              <button>Cancel</button>
              <button className="bg-[#DB4444] font-bold text-white px-5 py-3 rounded-sm">Save Changes</button>
            </div>
          </form>
        </aside>
      </section>
    </div>
  )
}

export default Contact