import { create } from "zustand"
import { persist } from "zustand/middleware"

type Post = {
  id: number
  title: string
  excerpt: string
  image: string
}

type RecentlyViewedStore = {
  recentlyViewed: Post[]
  addRecentlyViewed: (post: Post) => void
}

export const useRecentlyViewedStore = create(
  persist<RecentlyViewedStore>(
    (set) => ({
      recentlyViewed: [],
      addRecentlyViewed: (post) =>
        set((state) => {
          const updatedRecentlyViewed = [post, ...state.recentlyViewed.filter((p) => p.id !== post.id)].slice(0, 5) // Keep only the 5 most recent
          return { recentlyViewed: updatedRecentlyViewed }
        }),
    }),
    {
      name: "recently-viewed-storage",
    },
  ),
)

