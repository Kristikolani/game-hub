import { useInfiniteQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import APIClient,{FetchResponse} from "../services/api-client";
import { Platform } from "../hooks/usePlatforms";


export interface Game {
    id: number;
    name: string;
    background_image:string;
    parent_platforms:{platform:Platform}[];
    metacritic:number;
  }
  
  const apiClient = new APIClient<Game>('/games')

const useGames = (gameQuery:GameQuery) => 
    useInfiniteQuery<FetchResponse<Game>,Error>({
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
export default useGames;