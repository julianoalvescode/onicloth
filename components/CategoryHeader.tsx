interface CategoryHeaderProps {
  title: string;
  count: number;
}

export default function CategoryHeader({ title, count }: CategoryHeaderProps) {
  return (
    <div className='flex justify-between items-center mb-8'>
      <h1 className='font-lato-black text-2xl text-black'>
        {title} ({count})
      </h1>
    </div>
  );
}
