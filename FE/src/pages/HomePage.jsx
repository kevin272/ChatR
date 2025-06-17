import { useQueryClient } from "@tanstack/react-query"

const HomePage = () => {
  const queryClient = useQueryClient();
  
  return (
    <div>HomePage</div>
  )
}

export default HomePage