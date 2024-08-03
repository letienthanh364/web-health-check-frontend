import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import websiteApi, { websiteContactApi } from '../../apis/website.api'
import contactApi from '../../apis/contact.api'

const useListWebsites = (queryConfig: {}) => {
  return useQuery({
    queryKey: ['websites', queryConfig],
    queryFn: () => websiteApi.listWebsite(queryConfig)
  })
}

const useGetWebsiteDetai = (id: string) => {
  return useQuery({
    queryKey: ['websites', id],
    queryFn: () => websiteApi.getWebsite(id)
  })
}

const useListContactsForWebsite = (id: string) => {
  return useQuery({
    queryKey: ['websites', 'contacts', id],
    queryFn: () => websiteContactApi.listContactForWebsite(id)
  })
}

const useAddWebsite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: websiteApi.addWebsite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites'] })
    }
  })
}

const useUpdateWebsite = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: websiteApi.updateWebsite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites', id] })
    }
  })
}

const useDeleteWebsite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: websiteApi.deleteWebsite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites'] })
    }
  })
}

const useAddContactForWebsite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: websiteContactApi.addContactForWebsite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites', 'contacts'] })
    }
  })
}

const useDeleteContactForWebsite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: contactApi.deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites', 'contacts'] })
    }
  })
}

export const websiteQuery = {
  useListWebsites,
  useGetWebsiteDetai,
  useListContactsForWebsite,
  mutation: {
    useAddWebsite,
    useUpdateWebsite,
    useDeleteWebsite,
    useAddContactForWebsite,
    useDeleteContactForWebsite
  }
}
