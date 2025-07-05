from tests.conftest import create_task


def test_create_task(client):
    # First create a project and get it's id
    project_resp = client.post("/projects/", json={
        "title": "Task Project",
        "deadline": "2025-12-31T23:59:59"
    })
    project_id = project_resp.json()["id"]

    # Now create a task
    task_resp = client.post("/tasks/", json={
        "title": "Test Task",
        "description": "Some description",
        "deadline": "2025-11-30T12:00:00",
        "completed": False,
        "project_id": project_id
    })
    # Check if task was created
    assert task_resp.status_code == 200
    task = task_resp.json()
    assert task["title"] == "Test Task"
    assert task["project_id"] == project_id


def test_create_task_deadline_after_project_deadline(client):
    # First create a project and get it's id
    project_resp = client.post("/projects/", json={
        "title": "Task Project",
        "deadline": "2025-10-31T23:59:59"
    })
    project_id = project_resp.json()["id"]
    
    # Now try to create a task
    task_resp = client.post("/tasks/", json={
        "title": "Test Task",
        "description": "Some description",
        "deadline": "2025-11-30T12:00:00",
        "completed": False,
        "project_id": project_id
    })
    assert task_resp.status_code == 400
    

def test_get_tasks(client):
    # First download tasks
    response = client.get("/tasks/")
    assert response.status_code == 200
    # If response was 200 then check data length and type
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    
    
def test_get_single_task(client, create_task):
    task = create_task()
    response = client.get(f"/tasks/{task['id']}")
    assert response.status_code == 200
    assert response.json()["id"] == task["id"]


def test_get_nonexistent_task(client):
    response = client.get("/tasks/9999")
    assert response.status_code == 404


def test_update_task(client):
    # First download a task
    response = client.get("/tasks/")
    assert response.status_code == 200
    data = response.json()[0]
    # Change description of first task and see if it worked
    new_desc = 'Changed description'
    data['description'] = new_desc
    task_resp = client.put(f'/tasks/{data['id']}', json=data)
    assert task_resp.status_code == 200
    assert task_resp.json()['description'] == new_desc


def test_delete_task(client):
    # First download a task
    response = client.get("/tasks/")
    assert response.status_code == 200
    data = response.json()[0]
    # Try to delete it and see if it worked
    task_resp = client.delete(f'/tasks/{data['id']}')
    assert task_resp.status_code == 200