import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient,{FetchResponse} from "../services/api-client";
import { Platform } from "../hooks/usePlatforms";
import useGameQueryStore from "../store";


export interface Game {
    id: number;
    name: string;
    slug:string;
    description_raw: string;
    background_image:string;
    parent_platforms:{platform:Platform}[];
    metacritic:number;
  }
  
  const apiClient = new APIClient<Game>('/games')

const useGames = () => 
  {
    const gameQuery = useGameQueryStore(s=>s.gameQuery)
    return useInfiniteQuery<FetchResponse<Game>,Error>({
        queryKey:['games',gameQuery],
        queryFn:({pageParam = 1}) => apiClient.getAll(
        {params:{
            genres:gameQuery.genreId,
            parent_platforms:gameQuery.platformId,
            ordering:gameQuery.sortOrder,
            search:gameQuery.searchText,
            page:pageParam}},),
            getNextPageParam:(lastPage,allPages) => {
                return lastPage.next ? allPages.length+1 : undefined;
            },
        initialPageParam:undefined,
    })
}
export default useGames;