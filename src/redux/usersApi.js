import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://training.pixbit.in/api/`,
  }),
  tagTypes: ["Employee", "Designation"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query(data) {
        return {
          url: `register`,
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query(data) {
        return {
          url: `login`,
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: data,
        };
      },
    }),
    getEmployees: builder.query({
      query: () => {
        return {
          url: `employees`,
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
        };
      },
      providesTags: ["Employee"],
    }),
    createEmployee: builder.mutation({
      query(data) {
        return {
          url: `employees`,
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
          body: data,
        };
      },
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation({
      query(data) {
        const { id, ...employee } = data;
        return {
          url: `employees/${id}`,
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
          body: employee,
        };
      },
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation({
      query(id) {
        return {
          url: `employees/${id}`,
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
        };
      },
      invalidatesTags: ["Employee"],
    }),
    getDesignations: builder.query({
      query: () => {
        return {
          url: `designations`,
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
        };
      },
      providesTags: ["Designation"],
    }),
    createDesignation: builder.mutation({
      query(data) {
        return {
          url: `designations`,
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
          body: data,
        };
      },
      invalidatesTags: ["Designation"],
    }),
    updateDesignation: builder.mutation({
      query(data) {
        const { id, ...list } = data;
        return {
          url: `designations/${id}`,
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
          body: list,
        };
      },
      invalidatesTags: ["Designation"],
    }),
    deleteDesignation: builder.mutation({
      query: (id) => {
        return {
          url: `designations/${id}`,
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
        };
      },
      invalidatesTags: ["Designation"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetDesignationsQuery,
  useCreateDesignationMutation,
  useUpdateDesignationMutation,
  useDeleteDesignationMutation,
} = usersApi;
