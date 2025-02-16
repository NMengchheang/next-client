'use server'

// ******** //
// Product //
// ******** //
export const fetchProducts = async () => {
    const res = await fetch("http://localhost:8000/api/products/", {
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Cannot fetch from actions.ts');
    }
    const data = await res.json();
    return data;
}
export const createProduct = async (productData: {
    name: string;
    price: number | "";
    stock: number | "";
    category_id: number | null;
    desc?: string;
}) => {
    const res = await fetch("http://localhost:8000/api/products/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(productData),
    })

    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to create product: ${errorMessage}`);
    }

    return res.json();
}
export const updateProduct = async (id: number, productData: { 
    name: string;
    price: number | "";
    stock: number | "";
    category_id: number | null;
    desc?: string;
}) => {
    const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'PUT',  // or 'PATCH' depending on your Laravel API
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(productData),
    });

    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to update product: ${errorMessage}`);
    }

    return res.json();
};
export const deleteProduct = async (id: number) => {
    try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Failed to delete product: ${errorMessage}`);
        }
    
        return res.json();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete product.');
    }
};

// ******** //
// Category //
// ******** //
export const fetchCategories = async () => {
    const res = await fetch("http://localhost:8000/api/categories/", {
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Cannot fetch from actions.ts');
    }
    const data = await res.json();
    return data;
}
export const createCategory = async ( categoryData: {
    title: string;
    desc: string;
}) => {
    const res = await fetch("http://localhost:8000/api/categories/", {
        method: 'Post',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application'
        },
        body: JSON.stringify(categoryData),
    })
    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to create product: ${errorMessage}`);
    }
    return res.json();
}
export const updateCategory = async ( id: number, categoryData: {
    title: string;
    desc: string | '';
}) => {
    const res = await fetch(`http://localhost:8000/api/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application'
        },
        body: JSON.stringify(categoryData),
    })
    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to create product: ${errorMessage}`);
    }
    return res.json();
}
export const deleteCategory = async (id: number) => {
    try {
        const res = await fetch(`http://localhost:8000/api/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Failed to delete category: ${errorMessage}`);
        }
        return res.json();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete category.');
    } 
}

// **** //
// User //
// **** //
export const fetchUser = async () => {
    const res = await fetch("http://localhost:8000/api/mgt-user/", {
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Cannot fetch from actions.ts');
    }
    const data = await res.json();
    return data;
}
export const updateUser = async ( id: number, updatedData: {
    role?: string; 
    status?: string
}) => {
    const res = await fetch(`http://127.0.0.1:8000/api/mgt-user/update-on-id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application'
        },
        body: JSON.stringify(updatedData),
    })
    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to create user: ${errorMessage}`);
    }
    return res.json();
}
export const deleteUser = async (id: number) => {
    try {
        const res = await fetch(`http://localhost:8000/api/mgt-user/update-on-id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Failed to delete user: ${errorMessage}`);
        }
        return res.json();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete user.');
    } 
}