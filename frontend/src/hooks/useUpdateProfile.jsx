import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateProfile, isPending: isUploading } = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await fetch("/api/users/updateUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create account");
        return data;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Profile Updated Successfully!!");
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
      ]);
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });
  return { updateProfile, isUploading };
};

export default useUpdateProfile;
