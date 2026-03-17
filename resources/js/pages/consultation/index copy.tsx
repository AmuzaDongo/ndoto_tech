import { useForm } from "@inertiajs/react";

export default function Consultation() {

const { data, setData, post, processing, reset } = useForm({
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  preferred_date: "",
  message: "",
});

const submit = (e:any) => {
  e.preventDefault();

  post("/consultation", {
    onSuccess: () => reset(),
  });
};

return (

<div className="max-w-4xl mx-auto py-20">

<h1 className="text-4xl font-bold mb-10 text-center">
Schedule a Consultation
</h1>

<form onSubmit={submit} className="grid gap-6">

<input
type="text"
placeholder="Full Name"
value={data.name}
onChange={(e)=>setData("name", e.target.value)}
className="border p-3 rounded"
/>

<input
type="email"
placeholder="Email"
value={data.email}
onChange={(e)=>setData("email", e.target.value)}
className="border p-3 rounded"
/>

<input
type="text"
placeholder="Phone"
value={data.phone}
onChange={(e)=>setData("phone", e.target.value)}
className="border p-3 rounded"
/>

<select
value={data.service}
onChange={(e)=>setData("service", e.target.value)}
className="border p-3 rounded"
>

<option>Select Service</option>
<option>Web Development</option>
<option>Mobile App</option>
<option>Custom Software</option>
<option>Digital Marketing</option>

</select>

<textarea
placeholder="Tell us about your project"
value={data.message}
onChange={(e)=>setData("message", e.target.value)}
className="border p-3 rounded"
/>

<button
type="submit"
disabled={processing}
className="bg-blue-600 text-white py-3 rounded"
>

{processing ? "Submitting..." : "Book Consultation"}

</button>

</form>

</div>

);
}